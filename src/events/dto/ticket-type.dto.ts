import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TicketType {
  @ApiProperty()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  columnSize: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rowSize: number;

  @ApiProperty()
  @IsNotEmpty()
  metadataUrl: string;
}
