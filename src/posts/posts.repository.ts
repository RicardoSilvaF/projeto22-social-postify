import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostDto } from './dtos/post.dto';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async postPosts(body: PostDto) {
        return this.prisma.post.create({
            data: body
        })
    }

    async getPosts() {
        const posts = await this.prisma.post.findMany();
    
        const formattedPosts = posts.map(post => {
            if (post.image === null) {
                return {
                    id: post.id,
                    title: post.title,
                    text: post.text
                };
            } else {
                return post;
            }
        });
    
        return formattedPosts;
    }
    
    
    

    async getPostById(id: number) {
        const post = await this.prisma.post.findFirst({
            where: {
                id: id
            }
        });
        if (!post) {
            throw new HttpException('NOT FOUND',HttpStatus.NOT_FOUND)
        }

        if (post.image === null) {
            return {
                id: post.id,
                title: post.title,
                text: post.text
            };
        } else {
            return post;
        }
    }

    async updatePostById(id: number, body: PostDto){
        return await this.prisma.post.update({
            where: {
                id
            },
            data: {
                title: body.title,
                text: body.text
            }
        });
    }

    async deletePostById(id: number){
        return await this.prisma.post.delete({
            where: {
                id
            }
        })
    }

    async postFindRepeateds(body: PostDto) {
        const postRepeated = await this.prisma.post.findFirst({
            where: { title: body.title, text: body.text }
        })
        if (postRepeated) {
            throw new HttpException("CONFLICT", HttpStatus.CONFLICT)
        }
    }    

    async postFind(id: number) {
        const postFiltered = await this.getPostById(id)
        if (!postFiltered) {
            throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
        }
    }
}
