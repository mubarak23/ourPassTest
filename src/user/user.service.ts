import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/userMapping';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserDto } from './dto/user.login.dto';
import { comparePasswords, hashPassword } from 'src/shared/utils';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserStatus } from './interface/register-user-status.interface';
import { LoginUserStatus } from './interface/login-user.interface';
import { EditUserDto } from './dto/user.edit.dto';
import { EditUserStatus } from './interface/edit-user-status.interfacre';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegisterUserStatus> {
    let status: RegisterUserStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.createUser(userDto);
      return status;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginUserStatus> {
    const user = await this.findByLogin(loginUserDto);

    const token = this._createToken(user);

    return {
      emailAddress: user.emailAddress,
      ...token,
    };
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.usersRepository.findOne(options);
    return toUserDto(user);
  }

  async findByPayLoad({ emailAddress }: any): Promise<UserDto> {
    return await this.findOne({ where: { emailAddress } });
  }
  async createUser(userDto: CreateUserDto): Promise<UserDto> {
    const { name, emailAddress, password } = userDto;
    const userExist = await this.usersRepository.findOne({
      where: { emailAddress },
    });

    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const hasPassword = await hashPassword(password);
    await this.usersRepository.save({
      user_uuid: uuidv4(),
      name,
      emailAddress,
      password: hasPassword,
    });
    const saveUser = await this.usersRepository.findOne({
      where: { emailAddress },
    });

    return toUserDto(saveUser);
  }

  async findUserByUuid(user_uuid: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { user_uuid },
    });
    if (!user) {
      throw new NotFoundException('User Does Not Exist');
    }
    return user;
  }

  async editUser(
    user_uuid: string,
    editUser: EditUserDto,
  ): Promise<EditUserStatus> {
    let status: EditUserStatus = {
      success: true,
      message: 'user detail edited',
    };
    const user = await this.findUserByUuid(user_uuid);

    try {
      user.emailAddress = editUser.emailAddress;
      user.name = editUser.name;
      user.updatedAt = new Date();

      await this.usersRepository.save(user);
      return status;
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async findByLogin({ emalAddress, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { emailAddress: emalAddress },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  private _senitizeUser(user: UserEntity) {
    delete user.password;
    return user;
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.findByPayLoad(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ emailAddress, user_uuid }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { emailAddress, user_uuid };
    const accessToken = sign({ ...user }, process.env.JWT_SECRET);
    /// this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
