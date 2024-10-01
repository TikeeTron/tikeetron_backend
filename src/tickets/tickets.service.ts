import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Model, RootFilterQuery } from 'mongoose';
import { TicketType } from 'src/events/dto/ticket-type.dto';
import { EventsService } from 'src/events/events.service';
import { QueryTicketsDto } from 'src/tickets/dto/query-tickets.dto';
import { Order, PageDto } from 'src/common/dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private readonly model: Model<Ticket>,
    private readonly eventsService: EventsService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const event = await this.eventsService.findOne(createTicketDto.eventId);
    const ticket = await this.model.create({
      ...createTicketDto,
    });
    event.ticketTypes.forEach((ticketType: TicketType) => {
      if (ticketType.type === createTicketDto.type) {
        ticketType.capacity -= 1;
      }
    })

    await event.save();

    return ticket;
  }

  async findAll(query: QueryTicketsDto) {
    // to check if the event exists
    if (query.eventId) {
      await this.eventsService.findOne(query.eventId);
    }

    const where: RootFilterQuery<TicketDocument> = {};

    if (query.periodBegin && query.periodEnd) {
      where.createdAt = {
        $gte: query.periodBegin,
        $lte: query.periodEnd,
      };
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.buyerAddress) {
      where.buyerAddress = query.buyerAddress;
    }

    const itemCount = await this.model.find(where).countDocuments();
    const data = await this.model
      .find(where)
      .sort(query.order == Order.ASC ? 'createdAt' : '-createdAt')
      .skip(query.skip)
      .limit(query.take)
      .exec();

    return new PageDto<Ticket>(data, query.page, query.take, itemCount);
  }

  async findOne(id: number) {
    return await this.model.findOne({ ticketId: id });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return await this.model.findOneAndUpdate(
      { ticketId: id },
      updateTicketDto,
      {
        new: true,
      },
    );
  }
}
