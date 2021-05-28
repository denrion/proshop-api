import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
