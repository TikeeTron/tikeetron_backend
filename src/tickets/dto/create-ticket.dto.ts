import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsTronAddress } from 'src/common/decorators';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  ticketId: number;

  @ApiProperty()
  @IsNotEmpty()
  eventId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsTronAddress('buyerAddress')
  buyerAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  metadataUrl: string;
}
