import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryService } from './sharedServices/cloudinary.service';
import { CachingService } from './sharedServices/caching.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, CloudinaryService, CachingService],
  exports: [CloudinaryService, CachingService]
})
export class AppModule {}
