import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({
  timestamps: true,
})
export class Ticket {
  @Prop({ isRequired: true, unique: true })
  ticketId: number;

  @Prop({ isRequired: true })
  eventId: number;

  @Prop({ isRequired: true })
  buyerAddress: string;

  @Prop({ isRequired: true })
  type: string;

  @Prop({ isRequired: true })
  price: number;

  @Prop({ isRequired: true })
  metadataUrl: string;

  createdAt: Date;
  updatedAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
