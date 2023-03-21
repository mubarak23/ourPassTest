import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/userMapping';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserDto } from './dto/user.login.dto';
import { comparePasswords } from 'src/shared/utils';
import { JwtPayload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserStatus } from './interface/register-user-status.interface';
import { LoginUserStatus } from './interface/login-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegisterUserStatus> {
    let status: RegisterUserStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.createUser(userDto);
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
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByPayLoad({ emailAddress }: any): Promise<UserDto> {
    return await this.findOne({ where: { emailAddress } });
  }
  async createUser(userDto: CreateUserDto): Promise<UserDto> {
    const { name, emailAddress, password } = userDto;

    const userExist = await this.userRepo.findOne({ where: { emailAddress } });

    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = this.userRepo.create({
      uuid: uuidv4(),
      name,
      emailAddress,
      password,
    });
    await this.userRepo.save(user);
    return toUserDto(user);
  }

  async findByLogin({ emalAddress, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({
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

  private _createToken({ emailAddress }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { emailAddress };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
