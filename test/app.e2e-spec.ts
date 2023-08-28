import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())

    prisma = app.get(PrismaService)
    await prisma.media.deleteMany()
    await prisma.post.deleteMany()

    await app.init();
  });

  it('/health => should get an alive message', async () => {
    const { status, text } = await request(app.getHttpServer()).get('/health')
    expect(status).toBe(HttpStatus.OK);
    expect(text).toBe("I'm okay!");
  });

  describe('MediasController (e2e)', () => {
    it('POST /medias => should respond with status 200 if created a media succesfully', async () => {
      await request(app.getHttpServer())
        .post('/medias')
        .send({
          title: "test",
          username: "testusername",
        })
        .expect(HttpStatus.OK)

      const media = await prisma.media.findFirst({
        where: {
          title: "test",
          username: "testusername"
        }
      })

      expect(media).not.toBe(null)
    });
    it('POST /medias => should respond with status 400 if receive a invalid body', async () => {
      await request(app.getHttpServer())
        .post('/medias')
        .send({
          test: "test"
        })
        .expect(HttpStatus.BAD_REQUEST)
    });
    it('POST /medias => should respond with status 409 if already created', async () => {
      await request(app.getHttpServer())
        .post('/medias')
        .send({
          title: "test",
          username: "testusername",
        })

      await request(app.getHttpServer())
        .post('/medias')
        .send({
          title: "test",
          username: "testusername",
        })
        .expect(HttpStatus.CONFLICT)
    });


    it('GET /medias => should get the list of all medias', async () => {
      await prisma.media.create({
        data: {
          title: "Test title",
          username: "Test username"
        }
      });

      const mediaList = await request(app.getHttpServer()).get('/medias')
      expect(mediaList.statusCode).toBe(HttpStatus.OK)
      expect(mediaList.body).toHaveLength(1);
    })


    it('GET /medias/:id => Should respond with status 200 if get the media succesfully', async () => {
      const creator = await prisma.media.create({
        data: {
          title: "Test title",
          username: "Test username"
        }
      });
      
      const media = await request(app.getHttpServer())
        .get(`/medias/${creator.id}`)
        .expect(HttpStatus.OK);

      expect(media.body).toEqual({
        id: creator.id,
        title: "Test title",
        username: "Test username"
      });
    });
    it('GET /medias/:id => Should respond with status 404 when media is not found', async () => {
      await request(app.getHttpServer())
        .get('/medias/9')
        .expect(HttpStatus.NOT_FOUND);
    });


    it('PUT /medias/:id => Should respond with status 200 if updated succesfully', async () => {
      const creator = await prisma.media.create({
        data: {
          title: "Test title",
          username: "Test username"
        }
      });

      const update = await request(app.getHttpServer())
        .put(`/medias/${creator.id}`)
        .send({
          title: "title updated",
          username: "username updated",
        })
        .expect(HttpStatus.OK);

        expect(update.body).toEqual({
          id: creator.id,
          title: "title updated",
          username: "username updated"
        });
    });
    it('PUT /medias/:id => Should respond with status 404 when media is not found', async () => {
      await request(app.getHttpServer())
        .put('/medias/9')
        .send({
          title: "title",
          username: "username",
        })
        .expect(HttpStatus.NOT_FOUND);
    });
    it('PUT /medias/:id => Should respond with status 409 when update title and username already created', async () => {
      const creator = await prisma.media.create({
        data: {
          title: "Test title",
          username: "Test username"
        }
      });
      await prisma.media.create({
        data: {
          title: "title",
          username: "username"
        }
      });
      
      await request(app.getHttpServer())
        .put(`/medias/${creator.id}`)
        .send({
          title: "title",
          username: "username",
        })
        .expect(HttpStatus.CONFLICT);
    });

    it('DELETE /medias/:id => Should respond with status 200 if deleted succesfully', async () => {
      const creator = await prisma.media.create({
        data: {
          title: "Test title",
          username: "Test username"
        }
      });

      await request(app.getHttpServer())
        .delete(`/medias/${creator.id}`)
        .expect(HttpStatus.OK);
    })
    it('DELETE /medias/:id => Should respond with status 404 if media is not found', async () => {
      const creator = await prisma.media.create({
        data: {
          title: "Test title",
          username: "Test username"
        }
      });

      await request(app.getHttpServer())
        .delete(`/medias/${creator.id + 20}`)
        .expect(HttpStatus.NOT_FOUND);
    })


  })

  describe('PostsController (e2e)', () => {
    it('POST /posts => should respond with status 200 if created a post succesfully', async () => {
      await request(app.getHttpServer())
        .post('/posts')
        .send({
          title: "test title",
          text: "test text",
        })
        .expect(HttpStatus.OK)

      const post = await prisma.post.findFirst({
        where: {
          title: "test title",
          text: "test text"
        }
      })

      expect(post).not.toBe(null)
    });
    it('POST /posts => should respond with status 400 if body is invalid', async () => {
      await request(app.getHttpServer())
        .post('/posts')
        .send({
          title: "test title"
        })
        .expect(HttpStatus.BAD_REQUEST)
    });


    it('GET /posts => should respond with status 200 if returned a post succesfully', async () => {
      await prisma.post.create({
        data: {
          title: "Test title",
          text: "Test text"
        }
      });

      const postList = await request(app.getHttpServer()).get('/posts')
      expect(postList.statusCode).toBe(HttpStatus.OK)
      expect(postList.body).toHaveLength(1);
    });


    it('GET /posts/:id => Should respond with status 200 if get the post succesfully', async () => {
      const creator = await prisma.post.create({
        data: {
          title: "Test title",
          text: "Test text"
        }
      });
      
      const post = await request(app.getHttpServer())
        .get(`/posts/${creator.id}`)
        .expect(HttpStatus.OK);

      expect(post.body).toEqual({
        id: creator.id,
        title: "Test title",
        text: "Test text"
      });
    });
    it('GET /posts/:id => Should respond with status 404 when post is not found', async () => {
      await request(app.getHttpServer())
        .get('/posts/9')
        .expect(HttpStatus.NOT_FOUND);
    });


    it('PUT /posts/:id => Should respond with status 200 if updated succesfully', async () => {
      const creator = await prisma.post.create({
        data: {
          title: "Test title",
          text: "Test text"
        }
      });

      const update = await request(app.getHttpServer())
        .put(`/posts/${creator.id}`)
        .send({
          title: "title updated",
          text: "text updated",
        })
        .expect(HttpStatus.OK);

        expect(update.body).toEqual({
          id: creator.id,
          title: "title updated",
          text: "text updated",
          image: null,
        });
    });
    it('PUT /posts/:id => Should respond with status 404 when post is not found', async () => {
      await request(app.getHttpServer())
        .put('/posts/9')
        .send({
          title: "title",
          text: "text",
        })
        .expect(HttpStatus.NOT_FOUND);
    });


    it('DELETE /posts/:id => Should respond with status 404 if post is not found', async () => {
      const creator = await prisma.post.create({
        data: {
          title: "Test title",
          text: "Test text"
        }
      });

      await request(app.getHttpServer())
        .delete(`/posts/${creator.id + 20}`)
        .expect(HttpStatus.NOT_FOUND);
    })
  })
});
