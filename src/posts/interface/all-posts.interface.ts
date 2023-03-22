import { PostDto } from '../dto/post.dto';

export interface AllCategoryInterface {
  posts: PostDto[];
  success: boolean;
  message: string;
}
