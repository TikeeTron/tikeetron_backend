import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TicketType } from '../dto/ticket-type.dto'

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
  capacity: number;

  @Prop({ isRequired: true })
  category: string;

  @Prop({ isRequired: true })
  date: Date;

  @Prop({ isRequired: true })
  organizer: string;

  @Prop({ isRequired: true })
  banner: string;

  @Prop({ isRequired: true })
  metadata: string;

  @Prop({ isRequired: true })
  ticketTypes: TicketType[];

  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
