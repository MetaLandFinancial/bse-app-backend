import { IsInt, IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

export enum EmailCodeLevel {
  Standard = 'standard',
  High = 'high',
}

export class CreateEmailCodeDto {
  @IsString()
  email: number;

  @IsEnum(EmailCodeLevel)
  level: EmailCodeLevel;

  @IsString()
  email_code: string;

  @IsOptional()
  @IsDate()
  expires_at?: Date;
}
