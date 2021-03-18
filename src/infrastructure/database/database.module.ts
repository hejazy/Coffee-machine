import { Module } from '@nestjs/common';
import { config } from '../'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.DB_URI || config.db.uri,
          autoIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
  ],
})
export class DatabaseModule { }