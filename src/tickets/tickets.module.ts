import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';
import { Event, EventSchema } from 'src/events/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Event.name, schema: EventSchema },
    ]),
    EventsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService, EventsService],
})
export class TicketsModule {}
