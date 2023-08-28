import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostDto } from './dtos/post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly repository: PostsRepository) { }

    async postPosts(body: PostDto) {
        return await this.repository.postPosts(body)
    }

    async getPosts() {
        return await this.repository.getPosts()
    }

    async getPostById(id: number) {
        const postFiltered = await this.repository.getPostById(id)
        if (!postFiltered) {
            throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
        }
        else {
            return postFiltered;
        }
    }

    async updatePostById(id: number, body: PostDto){
        await this.repository.postFind(id)
        await this.repository.postFindRepeateds(body)
        const updated = await this.repository.updatePostById(id, body);
        if(!updated){
            throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
        }
        return updated
    }

    async deletePostById(id:number) {
        
        await this.repository.postFind(id)
        // await publication repository find by id
        return await this.repository.deletePostById(id)
    }
}
