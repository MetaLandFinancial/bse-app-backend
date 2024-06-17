import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = this.userService.createUser(createUserDto);
    return {
      statusCode: 201,
      status: 'success',
      message: 'Sign up successfully',
      data: user,
    };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() userSignInDto: UserSignInDto): Promise<any> {
    const user = this.userService.signIn(userSignInDto);
    return {
      statusCode: 200,
      status: 'success',
      message: 'Sign in successfully',
      data: user,
    };
  }
}
