import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { User } from '../../src/user/user.entity';
import { AppModule } from '../../src/app.module';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

// npx jest test/users/users.service.spec.ts
describe('UsersService Integration Test', () => {
    let service: UserService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],  // Importing AppModule to reuse configuration
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should find an existing user by username', async () => {
        // Test to find an existing user
        const username = 'admin'; // Make sure this username exists in your test database
        const user = await service.findByUsername(username);
        console.log('User:', user);
        expect(user).toBeDefined();
        expect(user.username).toEqual(username);
    });

    it('should throw NotFoundException for a non-existent user', async () => {
        const username = 'nonexistentUsername';
        await expect(service.findByUsername(username)).rejects.toThrow(NotFoundException);
    });
  
});
