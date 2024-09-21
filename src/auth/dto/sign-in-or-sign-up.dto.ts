import { ApiProperty } from '@nestjs/swagger';
import { IsTronAddress } from 'src/common/decorators';

export class SignInOrSignUpDto {
  @ApiProperty({
    description: 'User tron address',
  })
  @IsTronAddress('address')
  address: string;
}
