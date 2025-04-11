import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ritual } from './ritual.entity';
import { User } from '../users/user.entity';

@Entity('ritual_completions')
export class RitualCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ritual, ritual => ritual.completions)
  ritual: Ritual;

  @ManyToOne(() => User, user => user.ritualCompletions)
  user: User;

  @Column()
  date: Date;

  @Column({ default: 1 })
  streakCount: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
} 