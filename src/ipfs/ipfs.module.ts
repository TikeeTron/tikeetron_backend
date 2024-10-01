import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/events/schemas/event.schema';

@Module({
  imports: [
    EventsModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [IpfsController],
  providers: [IpfsService, EventsService],
})
export class IpfsModule {}
