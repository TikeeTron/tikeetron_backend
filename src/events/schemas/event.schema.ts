import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: true,
})
export class Event {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  description: string;

  @Prop({ isRequired: true })
  date: Date;

  @Prop({ isRequired: true })
  organizer: string;

  @Prop({ isRequired: true })
  banner: string;

  @Prop({ isRequired: true })
  metadata: string;

  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
