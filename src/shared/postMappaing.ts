import { PostDto } from 'src/posts/dto/post.dto';
import { PostyEntity } from 'src/posts/entity/post.entity';

export const toCategoryDto = (data: PostyEntity): PostDto => {
  const { user_uuid, categoryId, title, content, createdAt } = data;
  const categoryDto: PostDto = {
    user_uuid,
    categoryId,
    title,
    content,
    createdAt,
  };

  return categoryDto;
};
