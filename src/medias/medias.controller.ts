import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediaDto } from './dtos/media.dto';

@Controller('medias')
export class MediasController {

    constructor(private readonly mediasService: MediasService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async postMedias(@Body() body: MediaDto) {
        return await this.mediasService.postMedias(body);
    }

    @Get()
    async getMedias() {
        return await this.mediasService.getMedias();
    }

    @Get(':id')
    async getMediaById(@Param('id', ParseIntPipe) id: number) {
        return await this.mediasService.getMediaById(id);
    }
}
