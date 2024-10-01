import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { IsTronAddress } from 'src/common/decorators';
import { TicketType } from './ticket-type.dto';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsTronAddress('organizer')
  @ApiProperty()
  @IsNotEmpty()
  organizer: string;

  @ApiProperty()
  @IsOptional()
  banner: string;

  @ApiProperty({
    type: [TicketType],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TicketType)
  ticketTypes: TicketType[];

  @ApiProperty()
  @IsNotEmpty()
  metadataUrl: string;
}
