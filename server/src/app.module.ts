import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoModule } from './_db/db.module';
import { ItemsModule } from './items/items.module';
import { IsUniqueConstraint } from './validation/isunique.constraint';
import { MongooseModule } from '@nestjs/mongoose';
// import { ItemsController } from './items/items.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    //MongoModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MY_URL'),
        dbName: configService.get('MY_SCHEMA'),
      }),
      inject: [ConfigService],
    }), 
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
