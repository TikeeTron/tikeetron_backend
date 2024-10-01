import { Injectable } from '@nestjs/common';
import { CreateIpfsDto, MetadataType } from './dto/create-ipfs.dto';
import { upload } from 'thirdweb/storage';
import { ConfigService } from '@nestjs/config';
import { createThirdwebClient, ThirdwebClient } from 'thirdweb';

@Injectable()
export class IpfsService {
  client: ThirdwebClient;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get<string>('THIRDWEB_CLIENT_ID');
    const secretKey = this.configService.get<string>('THIRDWEB_SECRET_KEY');

    this.client = createThirdwebClient({
      clientId,
      secretKey,
    });
  }

  async create(createIpfsDto: CreateIpfsDto) {
    let metadata: Record<string, any> = {};
    if (createIpfsDto.type === MetadataType.EVENT) {
      metadata = this.generateEventMetadata(createIpfsDto);
    } else {
      metadata = this.generateTicketMetadata(createIpfsDto);
    }
    const storage = await upload({
      client: this.client,
      files: [metadata],
    });

    return this.convertIpfsToHttp(storage);
  }

  private generateEventMetadata(createIpfsDto: CreateIpfsDto) {
    return {
      name: createIpfsDto.eventName,
      description: createIpfsDto.eventDescription,
      date: createIpfsDto.eventDate,
      location: createIpfsDto.eventLocation,
      capacity: createIpfsDto.eventCapacity,
      organizer: createIpfsDto.organizer,
      banner: createIpfsDto.banner,
      ticket_types: createIpfsDto.ticketTypes,
    };
  }

  private generateTicketMetadata(createIpfsDto: CreateIpfsDto) {
    return {
      eventName: createIpfsDto.eventName,
      eventId: createIpfsDto.eventId,
      type: createIpfsDto.ticketType,
      originalBuyer: createIpfsDto.buyerAddress,
      price: createIpfsDto.price,
    };
  }

  private convertIpfsToHttp(ipfsUrl: string) {
    const ipfsGateway = 'https://ipfs.io/ipfs/';

    return ipfsUrl.replace('ipfs://', ipfsGateway);
  }
}
