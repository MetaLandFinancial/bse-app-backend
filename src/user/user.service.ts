import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { EmailCode } from './email-code.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

import { CreateEmailCodeDto } from './dto/create-email-code.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(EmailCode)
    private readonly emailCodeRepository: Repository<EmailCode>
  ) {}



  async findUserByEmail(email: string): Promise<User | undefined> {
    
    const query = `SELECT * FROM "users" WHERE "email" = $1 LIMIT 1`;
    const result = await this.userRepository.query(query, [email]);
    const user = result[0];

    if (!user) {
        throw new NotFoundException(`No user found with email: ${email}`);
    }
    return user;
    
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password } = createUserDto;

    // Check if user with the same email or username already exists
    const existingUser = await this.userRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new UserAlreadyExistsException('Email or username already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);

    // Create a new user entity
    const user = this.userRepository.create({
      email,
      username,
      password_hash,
    });
    console.log('User:', user);
    // Save the user to the database
    return this.userRepository.save(user);
  }

  async signIn(userSignInDto: UserSignInDto): Promise<any> {
    const { email, password } = userSignInDto;

    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Here you would typically generate a JWT or some other token
    // For simplicity, we are returning a success message
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign({payload});
    return { accessToken };
  }

  async createOrUpdateEmailCode(createEmailCodeDto: CreateEmailCodeDto): Promise<EmailCode> {
    const { email, level } = createEmailCodeDto;

    // Check if an email code with the same email and level already exists
    let emailCode = await this.emailCodeRepository.findOne({ where: { email, level } });

    if (emailCode) {
      // Update the existing email code
      emailCode.email_code = createEmailCodeDto.email_code;
      emailCode.expires_at = createEmailCodeDto.expires_at;
    } else {
      // Create a new email code
      emailCode = this.emailCodeRepository.create(createEmailCodeDto);
    }

    return await this.emailCodeRepository.save(emailCode);
  }
}
