import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignInOrSignUpDto } from 'src/auth/dto/sign-in-or-sign-up.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async create(signInOrSignUp: SignInOrSignUpDto): Promise<UserDocument> {
    return await this.model.create(signInOrSignUp);
  }

  async findOne(address: string): Promise<UserDocument> {
    return await this.model.findOne({
      address,
    });
  }
}
