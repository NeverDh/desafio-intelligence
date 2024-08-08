import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CsvBullModule } from './csv-bull/csv-bull.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [ConfigModule.forRoot(), BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
      password: '1234'
    }
  }), CsvBullModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
