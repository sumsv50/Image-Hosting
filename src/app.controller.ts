import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { AppService } from './app.service';
import { GetResizedImageQueryDTO } from './dtos/getResizedImageQuery.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('public/images')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 32000000 }),
        ]
      })
    ) image: Express.Multer.File
  ) {
    const url = await this.appService.uploadImage(image);
    return { url };
  }

  @Get('public/images/:imageName')
  async getHello(
    @Param() params,
    @Query() queries: GetResizedImageQueryDTO,
    @Res() res
  ) {
    const { imageName } = params;
    const { width, height } = queries

    const imageBuffer = await this.appService.getResizedImage(imageName, width, height);

    Readable.from(imageBuffer).pipe(res);
  }
}
