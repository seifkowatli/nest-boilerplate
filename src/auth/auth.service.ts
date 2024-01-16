import { isEmpty } from 'class-validator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import PasswordUtil from 'src/utils/bcrypt';
import { User } from '../users/schemas/user.schema';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyToken(verifyTokenDto: VerifyTokenDto): Promise<unknown> {
    try {
      const payload = this.jwtService.verify(verifyTokenDto.token);
      if (isEmpty(payload)) throw new BadRequestException('Invalid token');

      return {
        status: HttpStatus.OK,
        message: 'Token is valid',
      };
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  //TODO fix the return object and a type to it
  async resetPasswordRequest(resetPasswordRequestDto: ResetPasswordRequestDto) {
    try {
      const user = await this.usersService.isUserExists(
        resetPasswordRequestDto.email,
      );
      if (!user)
        return {
          status: HttpStatus.OK,
          message: 'Reset password request has been sent to your email',
        };

      const payload = { name: user.full_name, sub: user._id };
      return {
        status: HttpStatus.OK,
        message: this.jwtService.sign(payload, { expiresIn: '1h' }),
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updatePassword(resetPasswordDto: ResetPasswordDto) {
    const payload = await this.jwtService.verify(resetPasswordDto.token);
    if (!payload) throw new BadRequestException('Invalid token');

    return this.usersService.updatePassword(
      payload.sub,
      resetPasswordDto.password,
    );
  }

  async updatePasswordByAdmin(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findOne(resetPasswordDto.token);
    if (!user) throw new BadRequestException('Invalid token');

    return this.usersService.updatePassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }

  //REFACTOR refactor use this.usersService.isUserExists instead of the current one
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.isUserExists(email);
    if (user && (await PasswordUtil.comparePasswords(password, user.password)))
      return user;

    return null;
  }

  //TODO figure out how to set a type instead of any in here
  login(user: any, isAdmin: boolean = false) {
    const currentUser = user.toObject();
    const payload = { name: user.full_name, sub: user._id };
    const { password, ...rest } = currentUser;

    return {
      user: rest,
      token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const payload = { name: user.full_name, sub: user._id };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
