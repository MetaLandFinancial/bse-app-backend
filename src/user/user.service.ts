import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


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

    // Save the user to the database
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    
    const query = `SELECT * FROM "users" WHERE "email" = $1 LIMIT 1`;
    const result = await this.userRepository.query(query, [email]);
    const user = result[0];
    
    if (!user) {
        throw new NotFoundException(`No user found with email: ${email}`);
    }
    return user;
    
}
}
