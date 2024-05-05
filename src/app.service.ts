import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from './sharedServices/cloudinary.service';
import { CachingService } from './sharedServices/caching.service';

@Injectable()
export class AppService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private cachingService: CachingService,
  ){}

  async uploadImage(img: Express.Multer.File): Promise<string> {
    const result = await this.cloudinaryService.uploadImage(img);
    const fileName = result.public_id.split("/").pop();

    const cachedKey = `${fileName}.${result.format}_nonexnone`;
    this.cachingService.cache.set(cachedKey, img.buffer);

    return `${process.env.HOST}/public/images/${fileName}.${result.format}`; 
  } 

  async getResizedImage(imageName: string, width: number, height: number): Promise<Buffer> {
    // Get from cache
    const cachedKey = `${imageName}_${width || 'none'}x${height || 'none'}`
    const cachedImg = this.cachingService.cache.get(cachedKey);
    if (cachedImg) {
      return cachedImg;
    }

    // Get from CDN
    const imageURL = this.cloudinaryService.getImageLink(imageName, width, height);
    const resp = await fetch(imageURL);

    if (resp.status === HttpStatus.NOT_FOUND) {
      throw new HttpException("Image not found!", HttpStatus.BAD_REQUEST);
    }

    if (resp.status === HttpStatus.BAD_REQUEST) {
      throw new HttpException("Bad request!", HttpStatus.BAD_REQUEST);
    }

    if (resp.status !== HttpStatus.OK) {
      throw new HttpException("Something went wrong!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const imageBuffer = Buffer.from(await resp.arrayBuffer());
    this.cachingService.cache.set(cachedKey, imageBuffer);

    return imageBuffer;
  }
}
