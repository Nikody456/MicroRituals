import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

export const JWT_SECRET = process.env.JWT_SECRET || 'yQKtYALokGLzfJfHUIandAJndiadIc';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: 'JWT_SECRET',
      useValue: JWT_SECRET,
    },
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {} 