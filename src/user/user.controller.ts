import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/user.create.dto';
import { EditUserDto } from './dto/user.edit.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { AllUsers } from './interface/all-user.interface';
import { LoginUserStatus } from './interface/login-user.interface';
import { RegisterUserStatus } from './interface/register-user-status.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get('')
  public async profile(@Req() req: any): Promise<LoginUserStatus> {
    return req.user;
  }

  @Get('/all')
  public async allUsers(@Req() req: any): Promise<AllUsers> {
    const result: RegisterUserStatus = await this.userService.allUser();

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterUserStatus> {
    const result: RegisterUserStatus = await this.userService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginUserStatus> {
    return await this.userService.login(loginUserDto);
  }

  @UseGuards(AuthGuard())
  @Patch('/:user_uuid')
  public async editUser(
    @Param('user_uuid') user_uuid: string,
    @Body() editUserDto: EditUserDto,
  ): Promise<RegisterUserStatus> {
    const result: RegisterUserStatus = await this.userService.editUser(
      user_uuid,
      editUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @UseGuards(AuthGuard())
  @Delete('/:user_uuid')
  public async deleteUser(
    @Req() req: any,
    @Param('user_uuid') user_uuid: string,
  ): Promise<RegisterUserStatus> {
    const user = req.user;
    if (user.user_uuid !== user_uuid) {
      throw new HttpException(
        'Can Delete other User Account',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result: RegisterUserStatus = await this.userService.deleteUser(
      user.user_uuid,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
