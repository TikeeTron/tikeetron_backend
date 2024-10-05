import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TicketType } from '../dto/ticket-type.dto';
import { Organizer } from 'src/organizers/schemas/organizer.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: true,
})
export class Event {
  // EventId on blockchain
  @Prop({ isRequired: true, unique: true })
  eventId: number;

  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ isRequired: true })
  location: string;

  @Prop({ isRequired: true })
  category: string;

  @Prop({ isRequired: true })
  startDate: Date;

  @Prop({ isRequired: true })
  endDate: Date;

  @Prop({
    isRequired: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Organizer.name,
    autopopulate: true,
  })
  organizer: Organizer;

  @Prop()
  banner: string;

  @Prop({ isRequired: true })
  metadataUrl: string;

  @Prop({ isRequired: true })
  ticketTypes: TicketType[];

  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
