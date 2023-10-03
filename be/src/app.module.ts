import { Module } from '@nestjs/common';
import { AppConfigModule } from './config';
import { DatabaseModule } from './database';
import { CenterModule } from './modules';
import { AppProviders } from './app.provider';

@Module({
  imports: [AppConfigModule, DatabaseModule, CenterModule],
  providers: AppProviders,
})
export class AppModule {}
