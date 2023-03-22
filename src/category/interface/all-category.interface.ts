import { CategoryDto } from '../dto/category.dto';

export interface AllCategoryInterface {
  categories?: CategoryDto[] | null;
  success: boolean;
  message: string;
}
