import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  HttpService,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Controller('file')
export default class FileUploadController {
  constructor(public httpService: HttpService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './files',
        filename(req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
      preservePath: true,
    }),
  )
  @Post('/upload')
  async uploadFile(@UploadedFile() file) {
    return {
      code: 0,
      file,
    };
  }

  @Get('/hello')
  getHello(): string {
    return 'Hello Uploader!';
  }

  @Get('/test-http')
  testHttp(): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:3000/file/hello').pipe(
      map((val: AxiosResponse<any>) => {
        console.log(val.data);
        return val.data;
      }),
    );
  }
}
