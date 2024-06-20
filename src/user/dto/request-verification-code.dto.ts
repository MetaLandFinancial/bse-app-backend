import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { EmailCodeLevel } from './create-email-code.dto';

export class RequestVerificationCodeDto {
  @IsEmail()
  email: string;

  @IsEnum(EmailCodeLevel)
  @IsNotEmpty()
  level: EmailCodeLevel;
}
