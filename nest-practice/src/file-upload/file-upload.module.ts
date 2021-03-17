import { Module , HttpModule} from '@nestjs/common';
import FileUploadController from './file-upload.controller';

@Module({
    imports: [HttpModule],
    controllers: [FileUploadController]
})
export default class FileUpload {}