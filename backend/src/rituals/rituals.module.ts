import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RitualsService } from './rituals.service';
import { RitualsController } from './rituals.controller';
import { Ritual } from './ritual.entity';
import { RitualCompletion } from './ritual-completion.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ritual, RitualCompletion]),
    UsersModule,
  ],
  providers: [RitualsService],
  controllers: [RitualsController],
  exports: [RitualsService],
})
export class RitualsModule {} 