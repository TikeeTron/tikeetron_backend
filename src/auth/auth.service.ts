import { Injectable } from '@nestjs/common';
import { SignInOrSignUpDto } from './dto/sign-in-or-sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signInOrSignUp(signInOrSignUp: SignInOrSignUpDto) {
    let user = await this.usersService.findOne(signInOrSignUp.address);

    if (user) {
      return {
        user,
        token: await this.generateToken(user),
      };
    }
    user = await this.usersService.create(signInOrSignUp);

    return {
      user,
      token: await this.generateToken(user),
    };
  }

  private async generateToken(user: UserDocument) {
    return await this.jwtService.signAsync({
      sub: user._id,
      address: user.address,
    });
  }
}
