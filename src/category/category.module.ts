import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';
import { CategoryController } from './category.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [CategoryService, UserService],
  exports: [PassportModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
