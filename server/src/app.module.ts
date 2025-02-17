import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './_db/db.module';
import { ItemsModule } from './items/items.module';
import { IsUniqueConstraint } from './validation/isunique.constraint';
// import { ItemsController } from './items/items.controller';

@Module({
  imports: [ConfigModule.forRoot(), MongoModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
