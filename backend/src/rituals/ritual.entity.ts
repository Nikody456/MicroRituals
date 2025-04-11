import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { RitualCompletion } from './ritual-completion.entity';

@Entity('rituals')
export class Ritual {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  frequency: {
    type: 'daily' | 'weekdays' | 'weekends' | 'custom';
    days?: number[];
    timesPerWeek?: number;
  };

  @Column({ type: 'time', nullable: true })
  timeOfDay: string;

  @Column({ default: false })
  isPrivate: boolean;

  @ManyToOne(() => User, user => user.rituals)
  user: User;

  @OneToMany(() => RitualCompletion, completion => completion.ritual)
  completions: RitualCompletion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 