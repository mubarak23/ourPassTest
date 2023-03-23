import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserStatus } from 'src/user/interface/register-user-status.interface';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { AllPostInterface } from './interface/all-posts.interface';
import { PostInterface } from './interface/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('/all')
  public async allUsers(@Req() req: any): Promise<AllPostInterface> {
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
  ): Promise<PostInterface> {
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

  @UseGuards(AuthGuard())
  @Patch('/:id')
  public async editPost(
    @Param('id') id: number,
    @Body() editPostDto: EditPostDto,
  ): Promise<PostInterface> {
    const result: PostInterface = await this.postService.editPost(
      id,
      editPostDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  public async deletePost(
    @Req() req: any,
    @Param('id') id: number,
  ): Promise<PostInterface> {
    const user = req.user;

    const result: PostInterface = await this.postService.deletePost(
      id,
      user.user_uuid,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
