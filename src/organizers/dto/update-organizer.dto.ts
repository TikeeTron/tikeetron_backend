import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateOrganizerDto {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;
}