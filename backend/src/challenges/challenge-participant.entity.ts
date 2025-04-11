import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('challenge_participants')
export class ChallengeParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.challengeParticipants)
  user: User;

  @Column()
  userId: string;

  @Column()
  challengeId: string;

  @CreateDateColumn()
  joinedAt: Date;
} 