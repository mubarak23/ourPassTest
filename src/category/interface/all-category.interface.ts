import { CategoryDto } from '../dto/category.dto';

export interface AllCategoryInterface {
  users?: CategoryDto[] | null;
  success: boolean;
  message: string;
}
