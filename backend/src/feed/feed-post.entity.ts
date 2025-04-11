import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('feed_posts')
export class FeedPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @Column()
  userId: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
} 