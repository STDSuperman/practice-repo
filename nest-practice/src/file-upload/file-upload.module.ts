import { Module } from '@nestjs/common';
import FileUploadController from './file-upload.controller';

@Module({
    controllers: [FileUploadController]
})
export default class FileUpload {}