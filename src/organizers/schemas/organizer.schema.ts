import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizerDocument = HydratedDocument<Organizer>;

@Schema({
  timestamps: true,
})
export class Organizer {
  @Prop({ isRequired: true, unique: true })
  address: string;

  @Prop({ default: 'Organizer' })
  name: string;

  @Prop({ default: 'https://www.gravatar.com/avatar/?d=mp' })
  photoUrl: string;

  createdAt: Date;
  updatedAt: Date;
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);
