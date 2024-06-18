import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../src/user/user.service';
import { User } from '../../src/user/user.entity';
import { AppModule } from '../../src/app.module';
import { NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { UserSignInDto } from '../../src/user/dto/user-sign-in.dto';

// npx jest test/user/user.service.spec.ts
describe('UsersService Integration Test', () => {
    let service: UserService;
    let jwtService: JwtService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],  // Importing AppModule to reuse configuration
        }).compile();

        service = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should find an existing user by email', async () => {
        // Test to find an existing user
        const email = 'admin@bse.com'; // Make sure this username exists in your test database
        const user = await service.findUserByEmail(email);
        console.log('User:', user);
        // expect(user).toBeDefined();
        // expect(user.username).toEqual(email);
    });

    // it('should throw NotFoundException for a non-existent user', async () => {
    //     const username = 'nonexistentUsername';
    //     await expect(service.findByUsername(username)).rejects.toThrow(NotFoundException);
    // });
    // it('should successfully create a user', async () => {
    //     // Test to find an existing user
    //     const createUserDto: CreateUserDto = {
    //         email: 'test@example.com',
    //         username: 'testuser',
    //         password: 'password123',
    //     };
    //     const user = await service.createUser(createUserDto);
    //     console.log('test User:', user);
    //     // expect(user).toBeDefined();
    //     // expect(user.username).toEqual(email);
    // });

    it('should successfully sign in a user', async () => {
        const userSignInDto = {
          email: 'test@example.com',
          password: 'password123'
        };
  
        const result = await service.signIn(userSignInDto);

        const decoded = jwtService.decode(result.accessToken);
        const resultEmail = decoded.payload.email;

        expect(resultEmail).toEqual(userSignInDto.email);
      });

      it('should throw an error if password is incorrect', async () => {
        const userSignInDto = {
            email: 'test@example.com',
            password: 'password12'
          };

  
        await expect(service.signIn(userSignInDto)).rejects.toThrow(
          new UnauthorizedException('Invalid credentials'),
        );
      });
  
});
