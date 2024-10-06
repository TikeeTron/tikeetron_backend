import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organizer } from './schemas/organizer.schema';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

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

  async update(address: string, updateOrganizerDto: UpdateOrganizerDto) {
    return await this.model.findOneAndUpdate(
      {
        where: {
          address,
        },
      },
      {
        name: updateOrganizerDto.name,
      },
      {
        new: true,
      },
    );
  }
}
