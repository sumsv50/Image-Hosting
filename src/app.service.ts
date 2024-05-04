import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from './sharedServices/cloudinary.service';

@Injectable()
export class AppService {
  constructor(
    private cloudinaryService: CloudinaryService
  ){}

  async uploadImage(img: Express.Multer.File): Promise<string> {
    const result = await this.cloudinaryService.uploadImage(img);
    const fileName = result.public_id.split("/").pop();
    return `${process.env.HOST}/public/images/${fileName}.${result.format}`; 
  } 

  async getResizedImage(imageName: string, width: number, height: number): Promise<Buffer> {
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
  
    return imageBuffer;
  }
}
