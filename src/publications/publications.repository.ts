import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PublicationDto } from './dtos/publication.dto';

@Injectable()
export class PublicationsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async postPublications(body: PublicationDto) {
        const media = await this.prisma.media.findFirst({
            where:{ id: body.mediaId}
        })
        const post = await this.prisma.post.findFirst({
            where:{ id: body.postId}
        })
        if(!media || !post){
            throw new HttpException("NOT FOUND",HttpStatus.NOT_FOUND)
        }

        return this.prisma.publication.create({
            data: body
        })
    }

    async getPublications() {
        return this.prisma.publication.findMany()
    }

    async getPublicationById(id: number){
        return this.prisma.publication.findFirst({
            where: {
                id: id
            }
        });
    }

    async updatePublicationById( id: number, body: PublicationDto) {
        const media = await this.prisma.media.findFirst({
            where:{ id: body.mediaId}
        })
        const post = await this.prisma.post.findFirst({
            where:{ id: body.postId}
        })
        if(!media || !post){
            throw new HttpException("NOT FOUND",HttpStatus.NOT_FOUND)
        }
        
        return await this.prisma.publication.update({
            where: {
                id
            },
            data: {
                mediaId: body.mediaId,
                postId: body.postId,
                date: body.date
            }
        });
    }

    async deletePublicationById(id: number) {
        return await this.prisma.publication.delete({
            where: {
                id
            }
        })
    }

    async publicationFindRepeateds(body: PublicationDto) {
        const publicationRepeated = await this.prisma.publication.findFirst({
            where: { mediaId: body.mediaId, postId: body.postId, date: body.date }
        })
        if (publicationRepeated) {
            throw new HttpException("CONFLICT", HttpStatus.CONFLICT)
        }
    }    

    async publicationFind(id: number) {
        const publicationFiltered = await this.getPublicationById(id)
        if (!publicationFiltered) {
            throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
        }
    }
}