import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationsRepository } from './publications.repository';
import { PublicationDto } from './dtos/publication.dto';

@Injectable()
export class PublicationsService {
    constructor(private readonly repository: PublicationsRepository) { }

    async postPublications(body: PublicationDto) {
        return await this.repository.postPublications(body)
    }

    async getPublications() {
        return await this.repository.getPublications()
    }

    async getPublicationById(id: number){
        const publicationFiltered = await this.repository.getPublicationById(id)
        if (!publicationFiltered) {
            throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
        }
        else {
            return publicationFiltered;
        }
    }

    async updatePublicationById( id: number, body: PublicationDto) {
        await this.repository.publicationFind(id)
        await this.repository.publicationFindRepeateds(body)
        const updated = await this.repository.updatePublicationById(id, body);
        if(!updated){
            throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
        }
        return updated
    }

    async deletePublicationById(id: number) {
        await this.repository.publicationFind(id)
        return await this.repository.deletePublicationById(id);
    }
}
