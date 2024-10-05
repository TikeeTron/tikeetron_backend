import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { OrganizersModule } from 'src/organizers/organizers.module';
import {
  Organizer,
  OrganizerSchema,
} from 'src/organizers/schemas/organizer.schema';

@Module({
  imports: [
    OrganizersModule,
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Organizer.name, schema: OrganizerSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
