import { PostDto } from '../dto/post.dto';

export interface AllPostInterface {
  posts?: PostDto[] | null;
  success: boolean;
  message: string;
}
