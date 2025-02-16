import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './_db/db.module';
import { ItemsModule } from './items/items.module';
// import { ItemsController } from './items/items.controller';

@Module({
  imports: [ConfigModule.forRoot(), MongoModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
