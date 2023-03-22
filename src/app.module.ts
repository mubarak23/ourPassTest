import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')], // [join(__dirname, '**', '*.entity.{ts,js}')],
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CategoryModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
