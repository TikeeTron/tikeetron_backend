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
      return true;
    }

    const isBasicAuth = this.reflector.getAllAndOverride<boolean>(IS_BASIC_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let basicAuthResult = false;
    if (isBasicAuth) {
      basicAuthResult = await this.tryBasicAuth(context);
    }

    // If basic auth succeeds, skip further checks
    if (basicAuthResult) {
      return true;
    }

    // Otherwise, continue to validate JWT token
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private async tryBasicAuth(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    if (!auth || !auth.startsWith('Basic ')) {
      return false; // No basic auth header, continue to the next auth check
    }

    try {
      const [username, password] = Buffer.from(auth.split(' ')[1], 'base64')
        .toString()
        .split(':');

      if (
        process.env.HTTP_BASIC_USER === username &&
        process.env.HTTP_BASIC_PASSWORD === password
      ) {
        return true; // Basic auth succeeded
      }
    } catch {
      return false; // Parsing error, continue to the next auth check
    }

    return false; // Basic auth failed, continue to the next auth check
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
