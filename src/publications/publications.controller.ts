import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PublicationDto } from './dtos/publication.dto';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
    constructor(private readonly service: PublicationsService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async postPublications(@Body() body: PublicationDto) {
        return await this.service.postPublications(body);
    }

    @Get()
    async getPublications() {
        return await this.service.getPublications();
    }

    @Get(':id')
    async getPublicationById(@Param('id', ParseIntPipe) id: number) {
        return await this.service.getPublicationById(id);
    }

    @Put(':id')
    async updatePublicationById(@Param('id', ParseIntPipe) id: number, @Body() body: PublicationDto) {
        return await this.service.updatePublicationById(id, body);
    }

    @Delete(':id')
    async deletePublicationById(@Param('id', ParseIntPipe) id: number) {
        return await this.service.deletePublicationById(id);
    }
}
