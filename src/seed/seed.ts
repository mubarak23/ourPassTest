import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { PostEntity } from 'src/posts/entity/post.entity';

const users = [
  {
    user_uuid: '08dbeb24-3c43-407f-9e8b-71223a18453b',
    name: 'demo World',
    emailAddress: 'demo@gmail.com',
  },
  {
    user_uuid: 'c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7',
    name: 'delete soft',
    emailAddress: 'soft@gmail.com',
  },
  {
    user_uuid: '1986c78b-a98f-403a-b13a-ad8f3ed8b867',
    name: 'unknow soft',
    emailAddress: 'unkown@gmail.com',
  },
];

const categories = [
  {
    id: 1,
    user_uuid: 'c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7',
    name: 'Digital Coin',
    description: 'Digital decentralize currency',
  },
  {
    id: 2,
    user_uuid: 'c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7',
    name: 'AliExpress',
    description: 'Online commerce for young Genz',
  },
  {
    id: 4,
    user_uuid: 'c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7',
    name: 'Edit Completed',
    description: 'Somthing we are trying to delete',
  },
];

const posts = [
  {
    id: 1,
    user_uuid: 'c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7',
    categoryId: 4,
    title: 'Design API with Data efficiency in mind',
    content:
      'you believe will best showcase your experience and differentiate yourself from other, you believe will best showcase your experience and differentiate yourself from oth',
  },
  {
    id: 2,
    user_uuid: 'c2c4dd2b-1d6e-4bbd-bc25-69348b5b6ab7',
    categoryId: 4,
    title: 'Edit Edit Edit ',
    content:
      'you Delete edit delete edit delete edit berience and differentiate yourself from oth',
  },
];

export default class SeedData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(users)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values(categories)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values(posts)
      .execute();
  }
}
