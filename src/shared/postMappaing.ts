import { PostDto } from 'src/posts/dto/post.dto';
import { PostEntity } from 'src/posts/entity/post.entity';

export const toCategoryDto = (data: PostEntity): PostDto => {
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
