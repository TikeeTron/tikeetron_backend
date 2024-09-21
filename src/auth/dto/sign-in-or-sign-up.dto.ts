import { ApiProperty } from '@nestjs/swagger';
import { IsTronAddress } from 'src/common/decorators';
import { IsNotEmpty } from 'class-validator';

export class SignInOrSignUpDto {
  @ApiProperty({
    description: 'User tron address',
  })
  @IsNotEmpty()
  @IsTronAddress('address')
  address: string;
}
