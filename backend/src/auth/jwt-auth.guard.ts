import { Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error(`JWT Auth Error: ${err?.message || info?.message}`);
      throw err || new Error(info?.message || 'Unauthorized');
    }
    return user;
  }
} 