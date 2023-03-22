import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { CategoryEntity } from './entity/category.entity';
import { AllCategoryInterface } from './interface/all-category.interface';
import { CategoryInterface } from './interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private readonly userService: UserService,
  ) {}

  async createCategory(
    createCategryDto: CreateCategoryDto,
    user_uuid: string,
  ): Promise<CategoryInterface> {
    let status: CategoryInterface = {
      success: true,
      message: 'New Category Created',
    };
    try {
      const user = await this.userService.findUserByUuid(user_uuid);

      if (!user) {
        throw new HttpException(
          'User Does Not Exist exist',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.categoryRepository.save({
        user_uuid,
        name: createCategryDto.name,
        description: createCategryDto.description,
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
  async findCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new HttpException(
        'Category Does Not Exist exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }
  async editCategory(
    id: number,
    editCategory: EditCategoryDto,
  ): Promise<CategoryInterface> {
    let status: CategoryInterface = {
      success: true,
      message: 'Category detail edited',
    };

    try {
      const category = await this.findCategoryById(id);
      if (editCategory.name) {
        category.name = editCategory.name;
      }

      if (editCategory.description) {
        category.description = editCategory.description;
      }
      category.updatedAt = new Date();

      await this.categoryRepository.save(category);
      return status;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }
  async deleteCategory(
    id: number,
    user_uuid: string,
  ): Promise<CategoryInterface> {
    let status: CategoryInterface = {
      success: true,
      message: 'Category Deleted',
    };
    const category = await this.findCategoryById(id);

    if (!category) {
      throw new HttpException(
        'Category Does Not Exist exist',
        HttpStatus.NOT_FOUND,
      );
    }

    if (category.user_uuid !== user_uuid) {
      throw new HttpException(
        'You Cannot Delete a Category You Did Not Create',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      category.isSoftDeleted = true;
      category.updatedAt = new Date();

      await this.categoryRepository.save(category);
      return status;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async allCategory(): Promise<AllCategoryInterface> {
    let status: AllCategoryInterface = {
      success: true,
      message: 'All Category',
    };

    try {
      const categories = await this.categoryRepository.find({
        where: { isSoftDeleted: false },
      });

      const transformCategiries = categories.map((category) => {
        return {
          id: category.id,
          user_uuid: category.user_uuid,
          name: category.name,
          description: category.description,
        };
      });

      status.categories = transformCategiries;
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
