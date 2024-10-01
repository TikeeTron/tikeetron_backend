import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';

@Module({
  imports: [EventsModule],
  controllers: [IpfsController],
  providers: [IpfsService, EventsService],
})
export class IpfsModule {}
