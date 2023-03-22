import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create.post.dto';
import { PostEntity } from './entity/post.entity';
import { PostInterface } from './interface/post.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    user_uuid: string,
  ): Promise<PostInterface> {
    let status: PostInterface = {
      success: true,
      message: 'New Post Added',
    };
    try {
      const user = await this.userService.findUserByUuid(user_uuid);

      if (!user) {
        throw new HttpException(
          'User Does Not Exist exist',
          HttpStatus.NOT_FOUND,
        );
      }
      const category = await this.categoryService.findCategoryById(
        createPostDto.categoryId,
      );

      if (!category) {
        throw new HttpException(
          'Category Selected Does Not Exist exist',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.postRepository.save({
        user_uuid,
        categoryId: createPostDto.categoryId,
        title: createPostDto.title,
        content: createPostDto.content,
      });
      return status;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }
}
