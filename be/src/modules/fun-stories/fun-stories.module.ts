import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FunStoriesController } from './fun-stories.controller';
import { FunStoriesService } from './fun-stories.service';
import { FunStoriesProvider, UserFunStoriesProvider } from './schemas';
import { UserModule } from '../users';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      FunStoriesProvider,
      UserFunStoriesProvider,
    ]),
    UserModule,
  ],
  controllers: [FunStoriesController],
  providers: [FunStoriesService],
  exports: [FunStoriesService],
})
export class FunStoriesModule {}
