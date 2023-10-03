import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from '../config';

@Module({
  imports: [MongooseModule.forRoot(configuration().mongodbURL)],
})
export class DatabaseModule {}
