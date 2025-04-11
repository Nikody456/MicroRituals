import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeParticipant } from './challenge-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChallengeParticipant])],
  exports: [TypeOrmModule],
})
export class ChallengesModule {} 