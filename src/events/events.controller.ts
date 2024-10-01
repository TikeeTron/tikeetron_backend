import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Event } from './schemas/event.schema';
import { QueryEventDto } from './dto/query-event.dto';

@ApiTags('events')
@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiCreatedResponse({ type: Event })
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOkResponse({
    example: {
      data: [
        {
          _id: 'string',
          eventId: 0,
          name: 'string',
          description: 'string',
          location: 'string',
          capacity: 0,
          category: 'string',
          date: '2024-09-30T11:56:04.942Z',
          organizer: {
            _id: 'string',
            name: 'string',
            photoUrl: 'string',
            createdAt: '2024-09-30T11:56:04.942Z',
            updatedAt: '2024-09-30T11:56:04.942Z',
          },
          banner: 'string',
          ticketTypes: [
            {
              type: 'string',
              price: 'string',
              columnSize: 0,
              rowSize: 0,
              metadataUrl: 'string',
            },
          ],
          metadataUrl: 'string',
          createdAt: '2024-09-30T11:56:04.942Z',
          updatedAt: '2024-09-30T11:56:04.942Z',
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
  async findAll(@Query() query: QueryEventDto) {
    return await this.eventsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return await this.eventsService.update(+id, updateEventDto);
  }
}
