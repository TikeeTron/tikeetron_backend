import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { IsTronAddress } from 'src/common/decorators';
import { Order, PageOptionsDto } from 'src/common/dto';

export class QueryTicketsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  eventId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  periodBegin?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  periodEnd?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsTronAddress('buyerAddress')
  buyerAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.DESC;
}
