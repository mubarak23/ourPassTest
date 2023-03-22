import { UserDto } from '../dto/user.dto';

// UserDto
export interface AllUsers {
  users?: UserDto[] | null;
  success: boolean;
  message: string;
}
