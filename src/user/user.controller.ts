import { Controller, Post, Get, Patch, Body,Param, Query, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { RequestVerificationCodeDto } from './dto/request-verification-code.dto';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';

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
      console.log('access',accessToken);
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

  @UseGuards(AuthGuard('jwt'))
  @Get('get-profile-info')
  async getProfileInfo(@Request() req): Promise<{ balance: number; availableBalance: number }> {
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const email = decodedToken.email;
    return this.userService.getUserBalanceByEmail(email);
  }

  @Get('get-user-balance')
  async getUserBalance(@Query('email') email: string): Promise<{ balance: number; availableBalance: number }> {
    return this.userService.getUserBalanceByEmail(email);
  }

  @Patch('increase-balance')
  async increaseBalance(
    @Query('email') email: string,
    @Body('amount') amount: number,
  ): Promise<User | undefined> {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    return this.userService.increaseBalanceByEmail(email, amount);
  }
}
