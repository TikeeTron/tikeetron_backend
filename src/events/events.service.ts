import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import mongoose, { Model, RootFilterQuery } from 'mongoose';
import { QueryEventDto } from './dto/query-event.dto';
import { Order, PageDto, PageMetaDto } from 'src/common/dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private readonly model: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = new this.model(createEventDto);

    return await event.save();
  }

  async findAll(query: QueryEventDto) {
    const where: RootFilterQuery<EventDocument> = {};

    if (query.name) {
      where.name = {
        $regex: query.name,
        $options: 'i',
      };
    }

    if (query.periodBegin && query.periodEnd) {
      where.date = {
        $gte: query.periodBegin,
        $lte: query.periodEnd,
      };
    }

    if (query.organizer) {
      where.organizer = query.organizer;
    }

    const itemCount = await this.model.find(where).countDocuments();
    const data = await this.model
      .find(where)
      .sort(query.order == Order.ASC ? 'createdAt' : '-createdAt')
      .skip(query.skip)
      .limit(query.take)
      .exec();

    return new PageDto<Event>(data, query.page, query.take, itemCount);
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid event ID: ${id}`);
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const event = await this.model.findById(objectId).exec();

    if (!event) {
      throw new NotFoundException(`Event #${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid event ID: ${id}`);
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const event = await this.model
      .findByIdAndUpdate(objectId, updateEventDto, {
        new: true,
      })
      .exec();

    return event;
  }
}
