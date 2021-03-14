import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('file')
export default class FileUploadController {
    @UseInterceptors(FileInterceptor('file', {
        storage:  multer.diskStorage({
            destination: './files',
            filename(req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname );
            }
        }),
        preservePath: true
    }))
    @Post('/upload')
    async uploadFile(@UploadedFile() file) {
        return {
            code: 0,
            file
        }
    }

    @Get('/hello')
    getHello(): string {
        return 'Hello Uploader!'
    }
}