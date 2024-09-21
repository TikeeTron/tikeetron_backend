import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInOrSignUpDto } from './dto/sign-in-or-sign-up.dto';
import { Public } from 'src/common/decorators';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in-or-sign-up')
  @ApiCreatedResponse({
    example: {
      status: true,
      statusCode: 201,
      data: {
        user: {
          id: '60f1b3b3b3b3b3b3b3b3b3b3',
          address: 'T9yD14Nj9j7xAB4dbGeiX9h8JcCj9f5f',
          createdAt: '2024-09-21T16:58:37.684Z',
          updatedAt: '2024-09-21T16:58:37.684Z',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGYxYjNiM2IzYjNiM2IzYjNiM2IzYjMiLCJhZGRyZXNzIjoiVDl5RDE0TmpqOWh4OGpjQ2o5ZjVmIn0.1',
      },
    },
  })
  async signInOrSignUp(@Body() signInOrSignUpDto: SignInOrSignUpDto) {
    return await this.authService.signInOrSignUp(signInOrSignUpDto);
  }
}
