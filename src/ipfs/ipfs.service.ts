import { Injectable } from '@nestjs/common';
import { CreateIpfsDto, MetadataType } from './dto/create-ipfs.dto';
import { upload } from 'thirdweb/storage';
import { ConfigService } from '@nestjs/config';
import { createThirdwebClient, ThirdwebClient } from 'thirdweb';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class IpfsService {
  client: ThirdwebClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventsService: EventsService,
  ) {
    const clientId = this.configService.get<string>('THIRDWEB_CLIENT_ID');
    const secretKey = this.configService.get<string>('THIRDWEB_SECRET_KEY');

    this.client = createThirdwebClient({
      clientId,
      secretKey,
    });
  }

  async create(createIpfsDto: CreateIpfsDto, banner: Express.Multer.File) {
    let bannerUrl: string;
    if (banner) {
      const uploadedFile = await upload({
        client: this.client,
        files: [new File([banner.buffer], banner.originalname)],
      });

      bannerUrl = this.convertIpfsToHttp(uploadedFile);
    }
    let metadata: Record<string, any> = {};
    if (createIpfsDto.type === MetadataType.EVENT) {
      metadata = this.generateEventMetadata(createIpfsDto, bannerUrl);
    } else {
      metadata = await this.generateTicketMetadata(createIpfsDto);
    }
    const storage = await upload({
      client: this.client,
      files: [metadata],
    });

    return this.convertIpfsToHttp(storage);
  }

  private generateEventMetadata(
    createIpfsDto: CreateIpfsDto,
    bannerUrl: string,
  ) {
    return {
      name: createIpfsDto.eventName,
      description: createIpfsDto.eventDescription,
      date: createIpfsDto.eventDate,
      location: createIpfsDto.eventLocation,
      capacity: createIpfsDto.eventCapacity,
      organizer: createIpfsDto.organizer,
      banner: bannerUrl,
      ticket_types: createIpfsDto.ticketTypes,
      createdAt: new Date().toLocaleString(),
    };
  }

  private async generateTicketMetadata(createIpfsDto: CreateIpfsDto) {
    const event = await this.eventsService.findOne(createIpfsDto.eventId);

    return {
      event_id: createIpfsDto.eventId,
      event_name: event.name,
      event_category: event.category,
      event_date: event.date,
      event_location: event.location,
      type: createIpfsDto.ticketType,
      originalBuyer: createIpfsDto.buyerAddress,
      price: createIpfsDto.price,
      createdAt: new Date().toLocaleString(),
    };
  }

  private convertIpfsToHttp(ipfsUrl: string) {
    const ipfsGateway = 'https://ipfs.io/ipfs/';

    return ipfsUrl.replace('ipfs://', ipfsGateway);
  }
}
