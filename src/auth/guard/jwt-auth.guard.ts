import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_BASIC_AUTH_KEY, IS_PUBLIC_KEY } from 'src/common/decorators/public.decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const isBasicAuth = this.reflector.getAllAndOverride<boolean>(IS_BASIC_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isBasicAuth) {
      return this.handleBasicAuth(context);
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private handleBasicAuth(context: ExecutionContext): boolean | PromiseLike<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException();
    }

    const [username, password] = Buffer.from(auth.split(' ')[1], 'base64')
      .toString()
      .split(':');

    if (
      process.env.HTTP_BASIC_USER === username &&
      process.env.HTTP_BASIC_PASSWORD === password
    ) {
      return true;
    }

    throw new UnauthorizedException();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
