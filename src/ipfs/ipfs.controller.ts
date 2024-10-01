import { Controller, Post, Body } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { CreateIpfsDto } from './dto/create-ipfs.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ipfs')
@ApiBearerAuth()
@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post()
  @ApiCreatedResponse({
    example: {
      status: true,
      statusCode: 201,
      data: 'https://ipfs.io/ipfs/QmepnwHTw8Kd2ApijfeBDvFzXQBnBoFetz6i5Mrof2S3bH/0',
    },
  })
  async create(@Body() createIpfsDto: CreateIpfsDto) {
    return await this.ipfsService.create(createIpfsDto);
  }
}
