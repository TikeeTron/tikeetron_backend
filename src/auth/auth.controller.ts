import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInOrSignUpDto } from './dto/sign-in-or-sign-up.dto';
import { Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in-or-sign-up')
  async signInOrSignUp(@Body() signInOrSignUpDto: SignInOrSignUpDto) {
    return await this.authService.signInOrSignUp(signInOrSignUpDto);
  }
}
