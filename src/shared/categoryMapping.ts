import { CategoryDto } from 'src/category/dto/category.dto';
import { CategoryEntity } from 'src/category/entity/category.entity';

export const toCategoryDto = (data: CategoryEntity): CategoryDto => {
  const { user_uuid, name, description, createdAt } = data;
  const categoryDto: CategoryDto = { user_uuid, name, description, createdAt };

  return categoryDto;
};
