import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsTronAddress } from 'src/common/decorators';
import { Order, PageOptionsDto } from 'src/common/dto';

export class QueryEventDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

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
  organizer?: string;

  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.DESC;
}
