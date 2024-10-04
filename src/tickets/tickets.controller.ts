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

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOkResponse({
    example: {
      data: [
        {
          _id: 'string',
          ticketId: 0,
          eventId: 0,
          type: 'string',
          buyerAddress: 'string',
          metadataUrl: 'string',
          createdAt: '2024-09-30T11:56:04.942Z',
          updatedAt: '2024-09-30T11:56:04.942Z',
        },
      ],
      meta: {
        page: 1,
        take: 1,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }
}
