import {
  Controller,
  Post,
  Body,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { CreateIpfsDto } from './dto/create-ipfs.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('ipfs')
@ApiBearerAuth()
@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('banner'))
  @ApiCreatedResponse({
    example: {
      status: true,
      statusCode: 201,
      data: 'https://ipfs.io/ipfs/QmepnwHTw8Kd2ApijfeBDvFzXQBnBoFetz6i5Mrof2S3bH/0',
    },
  })
  async create(
    @Body() createIpfsDto: CreateIpfsDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({
            fileType: '^.*.(jpeg|jpg|png)$',
          }),
        ],
      }),
    )
    banner: Express.Multer.File,
  ) {
    return await this.ipfsService.create(createIpfsDto, banner);
  }
}
