import { Injectable } from '@nestjs/common';
import { SignInOrSignUpDto } from './dto/sign-in-or-sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { OrganizersService } from 'src/organizers/organizers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly organizersService: OrganizersService,
    private readonly jwtService: JwtService,
  ) {}

  async signInOrSignUp(signInOrSignUp: SignInOrSignUpDto) {
    if (signInOrSignUp.isOrganizer) {
      return await this.signInOrSignUpOrganizer(signInOrSignUp);
    }
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

  private async signInOrSignUpOrganizer(signInOrSignUp: SignInOrSignUpDto) {
    let organizer = await this.organizersService.findOne(signInOrSignUp.address);

    if (organizer) {
      return {
        organizer,
        token: await this.generateToken(organizer),
      };
    }

    organizer = await this.organizersService.create(signInOrSignUp);

    return {
      organizer,
      token: await this.generateToken(organizer),
    };
  }

  private async generateToken(user: UserDocument) {
    return await this.jwtService.signAsync({
      sub: user.id,
      address: user.address,
    });
  }
}
