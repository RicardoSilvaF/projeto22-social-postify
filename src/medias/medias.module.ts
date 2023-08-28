import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';
import { MediasService } from './medias.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MediasRepository } from './medias.repository';

@Module({
  imports: [PrismaModule] ,
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
  exports: [MediasService]
})
export class MediasModule {}
