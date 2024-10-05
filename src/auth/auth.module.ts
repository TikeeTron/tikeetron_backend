import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrganizersModule } from 'src/organizers/organizers.module';
import { OrganizersService } from 'src/organizers/organizers.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organizer,
  OrganizerSchema,
} from 'src/organizers/schemas/organizer.schema';

@Module({
  imports: [
    UsersModule,
    OrganizersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
