/* eslint-disable @typescript-eslint/no-empty-function */
import { Req } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';

describe('CategoryController', () => {
  let categoryController: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  let categoryService: CategoryService;
  beforeAll(async () => {
    const CategoryServiceProvider = {
      provide: CategoryService,
      useFactory: () => ({
        createCategory: jest.fn(() => []),
        findCategoryById: jest.fn(() => []),
        editCategory: jest.fn(() => {}),
        deleteCategory: jest.fn(() => {}),
        allCategory: jest.fn(() => {}),
      }),
    };

    const UserServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        deleteUser: jest.fn(() => []),
        editUser: jest.fn(() => []),
        register: jest.fn(() => {}),
        login: jest.fn(() => {}),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        CategoryServiceProvider,
        UserServiceProvider,
      ],
    }).compile();

    categoryController = app.get<CategoryController>(CategoryController);
    categoryService = app.get<CategoryService>(CategoryService);
  });

  it('calling create category method', () => {
    const dto = new CreateCategoryDto();
    expect(categoryController.createCategory(Req, dto)).not.toEqual(null);
  });

  it('calling create category function', () => {
    const dto = new CreateCategoryDto();
    categoryController.createCategory(Req, dto);
    expect(categoryService.createCategory).toHaveBeenCalled();
    expect(categoryService.createCategory).toHaveBeenCalledWith(dto);
  });

  it('calling get category fucntion', () => {
    categoryController.allCategories(Req);
    expect(categoryService.allCategory()).toHaveBeenCalled();
  });

  it('calling update cateogry fucntion', () => {
    const editDto = new EditCategoryDto();
    const id = 2;
    categoryController.editCategory(id, editDto);
    expect(categoryService.editCategory(id, editDto)).toHaveBeenCalled();
  });

  it('calling delete cateogry fucntion', () => {
    const id = 3;
    const user_uuid = 'c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7';
    categoryController.deleteUser(Req, id);
    expect(categoryService.deleteCategory(id, user_uuid)).toHaveBeenCalled();
  });
});
