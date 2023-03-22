import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
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

  async findPostById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { id, isSoftDeleted: false },
    });
    if (!post) {
      throw new HttpException(
        'Category Does Not Exist exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }

  async editPost(id: number, editPost: EditPostDto): Promise<PostInterface> {
    let status: PostInterface = {
      success: true,
      message: 'Post detail edited',
    };

    try {
      const post = await this.findPostById(id);
      if (editPost.title) {
        post.title = editPost.title;
      }

      if (editPost.content) {
        post.content = editPost.content;
      }
      post.updatedAt = new Date();

      await this.postRepository.save(post);
      return status;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async deletePost(id: number, user_uuid: string): Promise<PostInterface> {
    let status: PostInterface = {
      success: true,
      message: 'Post Deleted',
    };
    const post = await this.findPostById(id);

    if (!post) {
      throw new HttpException(
        'Post Does Not Exist exist',
        HttpStatus.NOT_FOUND,
      );
    }

    if (post.user_uuid !== user_uuid) {
      throw new HttpException(
        'You Cannot Delete a Post You Did Not Create',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      post.isSoftDeleted = true;
      post.updatedAt = new Date();

      await this.postRepository.save(post);
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
