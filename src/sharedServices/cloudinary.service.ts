import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private v2 = v2;
  private folder = 'follme-warehouse';

  constructor() {
    this.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    })
  }

  async uploadImage(
    img: Express.Multer.File,
    folder: string = this.folder
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      this.v2.uploader.upload_stream({
        folder,
        use_filename: true,
        filename_override: img.originalname
      }, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }).end(img.buffer);
    })
  }

  getImageLink(
    imageName: string,
    width: number,
    height: number,
    folder: string = this.folder
  ): string {
    return this.v2.url(`${folder}/${imageName}`, { width, height })
  }
}