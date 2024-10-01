import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { IsTronAddress } from 'src/common/decorators';
import { TicketType } from 'src/events/dto/ticket-type.dto';

export enum MetadataType {
  EVENT = 'event',
  TICKET = 'ticket',
}

export class CreateIpfsDto {
  @ApiProperty({
    enum: MetadataType,
  })
  @IsNotEmpty()
  @IsEnum(MetadataType)
  type: MetadataType;

  @ApiProperty()
  @IsOptional()
  eventId: number;

  @ApiProperty()
  @IsOptional()
  ticketType: string;

  @ApiProperty()
  @IsOptional()
  buyerAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsOptional()
  eventName: string;

  @ApiProperty()
  @IsOptional()
  eventDescription: string;

  @ApiProperty()
  @IsOptional()
  eventLocation: string;

  @ApiProperty()
  @IsOptional()
  eventDate: string;

  @ApiProperty()
  @IsOptional()
  eventCategory: string;

  @ApiProperty()
  @IsOptional()
  eventCapacity: number;

  @ApiProperty()
  @IsOptional()
  @IsTronAddress('organizer')
  organizer: string;

  @ApiProperty()
  @IsOptional()
  banner: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TicketType)
  ticketTypes: TicketType[];

  @ApiProperty()
  @IsOptional()
  createdAt: string;
}
