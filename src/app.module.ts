import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediasModule } from './medias/medias.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MediasModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
