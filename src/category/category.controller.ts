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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { AllCategoryInterface } from './interface/all-category.interface';
import { CategoryInterface } from './interface/category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  public async allUsers(@Req() req: any): Promise<AllCategoryInterface> {
    const result: RegisterUserStatus = await this.categoryService.allCategory();

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
  @UseGuards(AuthGuard())
  @Post('/new')
  public async createCategory(
    @Req() req: any,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryInterface> {
    const user = req.user;
    const result: CategoryInterface = await this.categoryService.createCategory(
      createCategoryDto,
      user.user_uuid,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  public async editCategory(
    @Param('id') id: number,
    @Body() editCategoryDto: EditCategoryDto,
  ): Promise<CategoryInterface> {
    const result: CategoryInterface = await this.categoryService.editCategory(
      id,
      editCategoryDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  public async deleteUser(
    @Req() req: any,
    @Param('id') id: number,
  ): Promise<CategoryInterface> {
    const user = req.user;

    const result: CategoryInterface = await this.categoryService.deleteCategory(
      id,
      user.user_uuid,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
