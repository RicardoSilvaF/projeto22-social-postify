import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediaDto } from './dtos/media.dto';
import { Media } from './entities/media.entity';
import { validate } from 'class-validator';

@Injectable()
export class MediasService {
    private readonly medias: Media[];

    constructor() {
        this.medias = [];
    }

    async postMedias(body: MediaDto) {
        const {title, username} = body;

        const existingMedia = this.medias.find(
            media => media.title === title && media.username === username
        );

        if (existingMedia) {
            throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
        }

        return this.medias.push(new Media(title, username));
    }

    async getMedias() {
        return this.medias.map((media, index) => ({ id: index + 1, title: media.title, username: media.username }));
    }
}
