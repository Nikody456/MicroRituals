import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPost } from './feed-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedPost])],
  exports: [TypeOrmModule],
})
export class FeedModule {}
