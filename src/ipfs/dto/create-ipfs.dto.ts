import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { IsTronAddress } from 'src/common/decorators';
import { TicketType } from 'src/events/dto/ticket-type.dto';

export enum MetadataType {
  EVENT = 'event',
  TICKET = 'ticket',
}

export class CreateIpfsDto {
  @ApiPropertyOptional({
    enum: MetadataType,
  })
  @IsNotEmpty()
  @IsEnum(MetadataType)
  type: MetadataType;

  @ApiPropertyOptional()
  @IsOptional()
  eventId: number;

  @ApiPropertyOptional()
  @IsOptional()
  ticketType: string;

  @ApiPropertyOptional()
  @IsOptional()
  buyerAddress: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  eventName: string;

  @ApiPropertyOptional()
  @IsOptional()
  eventDescription: string;

  @ApiPropertyOptional()
  @IsOptional()
  eventLocation: string;

  @ApiPropertyOptional()
  @IsOptional()
  eventDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  eventCategory: string;

  @ApiPropertyOptional()
  @IsOptional()
  eventCapacity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsTronAddress('organizer')
  organizer: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  banner: Express.Multer.File;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TicketType)
  ticketTypes: TicketType[];
}
