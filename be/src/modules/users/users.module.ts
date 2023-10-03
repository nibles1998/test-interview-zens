import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { UserProvider } from './schemas';

@Module({
  imports: [MongooseModule.forFeatureAsync([UserProvider])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
