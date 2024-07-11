import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum EmailCodeLevel {
  Standard = 'standard',
  High = 'high',
}

export class RequestVerificationCodeDto {
  @IsEmail()
  email: string;

  @IsEnum(EmailCodeLevel)
  @IsNotEmpty()
  level: EmailCodeLevel;
}
