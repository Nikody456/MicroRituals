import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Ritual } from '../rituals/ritual.entity';
import { ChallengeParticipant } from '../challenges/challenge-participant.entity';
import { FeedPost } from '../feed/feed-post.entity';
import { RitualCompletion } from '../rituals/ritual-completion.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  username: string;

  @Column({ default: 0 })
  score: number;

  @Column({ type: 'jsonb', default: [] })
  achievements: string[];

  @OneToMany(() => Ritual, ritual => ritual.user)
  rituals: Ritual[];

  @OneToMany(() => ChallengeParticipant, participant => participant.user)
  challengeParticipants: ChallengeParticipant[];

  @OneToMany(() => FeedPost, post => post.user)
  posts: FeedPost[];

  @OneToMany(() => RitualCompletion, completion => completion.user)
  ritualCompletions: RitualCompletion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 