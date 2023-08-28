import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dtos/post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly service: PostsService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async postPosts(@Body() body: PostDto) {
        return await this.service.postPosts(body);
    }

    @Get()
    async getMedias() {
        return await this.service.getPosts();
    }

    @Get(':id')
    async getPostById(@Param('id', ParseIntPipe) id: number) {
        return await this.service.getPostById(id);
    }

    @Put(':id')
    async updatePostById(@Param('id', ParseIntPipe) id: number, @Body() body: PostDto) {
        return await this.service.updatePostById(id, body);
    }

    @Delete(':id')
    async deletePostById(@Param('id', ParseIntPipe) id: number) {
        return await this.service.deletePostById(id);
    }
}
