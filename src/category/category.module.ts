import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, UserEntity])],
  providers: [CategoryService, UserService],
})
export class CategoryModule {}
