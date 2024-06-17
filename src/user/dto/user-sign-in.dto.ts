import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
