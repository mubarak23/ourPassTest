import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AllCategoryInterface } from 'src/category/interface/all-category.interface';
import { CategoryInterface } from 'src/category/interface/category.interface';
import { RegisterUserStatus } from 'src/user/interface/register-user-status.interface';
import { CreatePostDto } from './dto/create.post.dto';
import { PostInterface } from './interface/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/all')
  public async allUsers(@Req() req: any): Promise<AllCategoryInterface> {
    const result: RegisterUserStatus = await this.postService.allPosts();

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @UseGuards(AuthGuard())
  @Post('/new')
  public async createNewPost(
    @Req() req: any,
    @Body() createPostDto: CreatePostDto,
  ): Promise<CategoryInterface> {
    const user = req.user;
    const result: PostInterface = await this.postService.createPost(
      createPostDto,
      user.user_uuid,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
