import { Module } from '@nestjs/common';
import { FunStoriesModule } from './fun-stories';
import { UserModule } from './users';

@Module({
  imports: [FunStoriesModule, UserModule],
})
export class CenterModule {}
