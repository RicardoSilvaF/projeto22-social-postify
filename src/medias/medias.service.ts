import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediaDto } from './dtos/media.dto';
import { Media } from './entities/media.entity';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
    constructor(private readonly repository: MediasRepository) {}

    async postMedias(body: MediaDto) {
        return await this.repository.postMedias(body)
    }

    async getMedias() {
        return this.repository.getMedias()
    }
}
