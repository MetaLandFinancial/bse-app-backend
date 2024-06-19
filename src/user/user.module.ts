import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EmailCode } from './email-code.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: 
    [
      TypeOrmModule.forFeature([User, EmailCode]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30d' },
      }),
    
    ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
