import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryTicketsDto } from './dto/query-tickets.dto';

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOkResponse({
    example: {
      _id: '6702564747d0930f21eeae87',
      ticketId: 1,
      eventId: 1,
      buyerAddress: 'TL7uFC1yXcF5JNqEZvVHboUo91W8FCKvTY',
      type: 'VIP Ticket',
      isUsed: false,
      price: 2499000000,
      metadataUrl: 'string',
      createdAt: '2024-10-06T09:20:07.973Z',
      updatedAt: '2024-10-06T09:20:07.973Z',
      __v: 0,
      event: {
        _id: '67024c1fe25264d39eb5bc86',
        eventId: 1,
        organizer: {
          _id: '6700f3aa798dc557f72ec630',
          address: 'TL7uFC1yXcF5JNqEZvVHboUo91W8FCKvTY',
          name: 'Organizer',
          photoUrl: 'https://www.gravatar.com/avatar/?d=mp',
          createdAt: '2024-10-05T08:07:06.293Z',
          updatedAt: '2024-10-05T08:07:06.293Z',
          __v: 0,
        },
        name: 'Web Summit',
        description: 'One of the largest tech conferences in the world.',
        category: 'Conference',
        startDate: '2024-11-04T00:00:00.000Z',
        endDate: '2024-11-07T00:00:00.000Z',
        location: 'Lisbon, Portugal',
        metadataUrl: null,
        banner:
          'https://www.expoexhibitionstands.com/wp-content/uploads/2024/05/web-summit-2024.jpg',
        createdAt: '2024-10-01T00:00:00.000Z',
        updatedAt: '2024-10-01T00:00:00.000Z',
        ticketTypes: [
          {
            name: 'General Admission',
            description: 'Access to all stages and exhibitions.',
            price: 899000000,
            capacity: 5000,
            startDate: '2024-06-01T00:00:00.000Z',
            endDate: '2024-11-01T00:00:00.000Z',
          },
          {
            name: 'VIP Ticket',
            description: 'Includes VIP seating and networking sessions.',
            price: 2499000000,
            capacity: 500,
            startDate: '2024-06-01T00:00:00.000Z',
            endDate: '2024-11-01T00:00:00.000Z',
          },
        ],
      },
      id: '6702564747d0930f21eeae87',
    },
  })
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOkResponse({
    example: {
      status: true,
      statusCode: 200,
      data: [
        {
          _id: '6702564747d0930f21eeae87',
          ticketId: 1,
          eventId: 1,
          buyerAddress: 'TL7uFC1yXcF5JNqEZvVHboUo91W8FCKvTY',
          type: 'VIP Ticket',
          isUsed: false,
          price: 2499000000,
          metadataUrl: 'string',
          createdAt: '2024-10-06T09:20:07.973Z',
          updatedAt: '2024-10-06T09:20:07.973Z',
          __v: 0,
          event: {
            _id: '67024c1fe25264d39eb5bc86',
            eventId: 1,
            organizer: {
              _id: '6700f3aa798dc557f72ec630',
              address: 'TL7uFC1yXcF5JNqEZvVHboUo91W8FCKvTY',
              name: 'Organizer',
              photoUrl: 'https://www.gravatar.com/avatar/?d=mp',
              createdAt: '2024-10-05T08:07:06.293Z',
              updatedAt: '2024-10-05T08:07:06.293Z',
              __v: 0,
            },
            name: 'Web Summit',
            description: 'One of the largest tech conferences in the world.',
            category: 'Conference',
            startDate: '2024-11-04T00:00:00.000Z',
            endDate: '2024-11-07T00:00:00.000Z',
            location: 'Lisbon, Portugal',
            metadataUrl: null,
            banner:
              'https://www.expoexhibitionstands.com/wp-content/uploads/2024/05/web-summit-2024.jpg',
            createdAt: '2024-10-01T00:00:00.000Z',
            updatedAt: '2024-10-01T00:00:00.000Z',
            ticketTypes: [
              {
                name: 'General Admission',
                description: 'Access to all stages and exhibitions.',
                price: 899000000,
                capacity: 5000,
                startDate: '2024-06-01T00:00:00.000Z',
                endDate: '2024-11-01T00:00:00.000Z',
              },
              {
                name: 'VIP Ticket',
                description: 'Includes VIP seating and networking sessions.',
                price: 2499000000,
                capacity: 500,
                startDate: '2024-06-01T00:00:00.000Z',
                endDate: '2024-11-01T00:00:00.000Z',
              },
            ],
          },
          id: '6702564747d0930f21eeae87',
        },
      ],
      meta: {
        page: 1,
        take: 10,
        itemCount: 1,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    },
  })
  async findAll(@Query() query: QueryTicketsDto) {
    return await this.ticketsService.findAll(query);
  }

  @ApiOkResponse({
    example: {
      _id: '6702564747d0930f21eeae87',
      ticketId: 1,
      eventId: 1,
      buyerAddress: 'TL7uFC1yXcF5JNqEZvVHboUo91W8FCKvTY',
      type: 'VIP Ticket',
      isUsed: false,
      price: 2499000000,
      metadataUrl: 'string',
      createdAt: '2024-10-06T09:20:07.973Z',
      updatedAt: '2024-10-06T09:20:07.973Z',
      __v: 0,
      event: {
        _id: '67024c1fe25264d39eb5bc86',
        eventId: 1,
        organizer: {
          _id: '6700f3aa798dc557f72ec630',
          address: 'TL7uFC1yXcF5JNqEZvVHboUo91W8FCKvTY',
          name: 'Organizer',
          photoUrl: 'https://www.gravatar.com/avatar/?d=mp',
          createdAt: '2024-10-05T08:07:06.293Z',
          updatedAt: '2024-10-05T08:07:06.293Z',
          __v: 0,
        },
        name: 'Web Summit',
        description: 'One of the largest tech conferences in the world.',
        category: 'Conference',
        startDate: '2024-11-04T00:00:00.000Z',
        endDate: '2024-11-07T00:00:00.000Z',
        location: 'Lisbon, Portugal',
        metadataUrl: null,
        banner:
          'https://www.expoexhibitionstands.com/wp-content/uploads/2024/05/web-summit-2024.jpg',
        createdAt: '2024-10-01T00:00:00.000Z',
        updatedAt: '2024-10-01T00:00:00.000Z',
        ticketTypes: [
          {
            name: 'General Admission',
            description: 'Access to all stages and exhibitions.',
            price: 899000000,
            capacity: 5000,
            startDate: '2024-06-01T00:00:00.000Z',
            endDate: '2024-11-01T00:00:00.000Z',
          },
          {
            name: 'VIP Ticket',
            description: 'Includes VIP seating and networking sessions.',
            price: 2499000000,
            capacity: 500,
            startDate: '2024-06-01T00:00:00.000Z',
            endDate: '2024-11-01T00:00:00.000Z',
          },
        ],
      },
      id: '6702564747d0930f21eeae87',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }
}
