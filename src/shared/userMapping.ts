import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { uuid, name, emailAddress } = data;
  const userDto: UserDto = { uuid, name, emailAddress };

  return userDto;
};
