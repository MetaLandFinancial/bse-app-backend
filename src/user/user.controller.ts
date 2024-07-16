import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { RequestVerificationCodeDto } from './dto/request-verification-code.dto';
import { User } from './user.entity';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = this.userService.createUser(createUserDto);
      return {
        statusCode: 201,
        status: 'success',
        message: 'Sign up successfully',
        data: user,
      };
    } catch (error) {
      throw error;
    }

  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userSignInDto: UserSignInDto): Promise<any> {
    try {
      const { accessToken } = await this.userService.signIn(userSignInDto);
      return {
        statusCode: 200,
        status: 'success',
        message: 'Sign in successfully',
        data: { accessToken },
      };
    } catch (error) {
      throw error; // Ensure the error is thrown to be caught by the global exception filter
    }
  }

  @Post('request-verification-code')
  @HttpCode(HttpStatus.OK)
  async requestVerificationCode(@Body() requestVerificationCodeDto: RequestVerificationCodeDto): Promise<any> {
    
    try {
      const { email, level } = requestVerificationCodeDto;
      await this.userService.requestVerificationCode(email, level);
      return {
        statusCode: 200,
        status: 'success',
        message: 'Request in successfully',
        data: { },
      };
    } catch (error) {
      throw error; // Ensure the error is thrown to be caught by the global exception filter
    }
  }
}
