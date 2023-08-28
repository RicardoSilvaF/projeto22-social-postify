import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediaDto } from './dtos/media.dto';
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

    async getMediaById(id: number) {
        const mediaFiltered = await this.repository.getMediaById(id)
        if(!mediaFiltered){
            throw new HttpException("NOT FOUND",HttpStatus.NOT_FOUND)
        }
        else{
            return mediaFiltered;
        }
    }
}
