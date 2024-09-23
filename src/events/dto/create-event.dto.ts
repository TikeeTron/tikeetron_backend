import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsTronAddress } from 'src/common/decorators';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

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
  @IsNotEmpty()
  banner: string;

  @ApiProperty()
  @IsNotEmpty()
  metadata: string;
}
