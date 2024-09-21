import { IsTronAddress } from 'src/common/decorators';

export class SignInOrSignUpDto {
  @IsTronAddress('address')
  address: string;
}
