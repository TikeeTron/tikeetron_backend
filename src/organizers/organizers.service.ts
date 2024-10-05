import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organizer } from './schemas/organizer.schema';

@Injectable()
export class OrganizersService {
  constructor(
    @InjectModel(Organizer.name) private readonly model: Model<Organizer>,
  ) {}

  async create(organizer: Partial<Organizer>) {
    return await this.model.create(organizer);
  }

  async findOne(address: string) {
    return await this.model.findOne({
      address,
    });
  }
}
