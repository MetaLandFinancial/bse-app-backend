import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity'; // Assuming you've created an entity for the transactions table
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}


  // Query transactions
  async findAll(): Promise<Transaction[]> {
    return await this.transactionsRepository.find();
  }

  // Query transactions by user_id
  async findByUserId(userId: number): Promise<Transaction[]> {
    return await this.transactionsRepository.find({ where: { user_id: userId } });
  }

  // Query a single transaction by id
  async findOne(id: number): Promise<Transaction> {
    return await this.transactionsRepository.findOneBy({ id });
  }

  // Insert a new transaction
  async create(transactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(transactionDto);
    return await this.transactionsRepository.save(transaction);
  }

    // Update transaction status by id
    async updateStatus(id: number, status: string): Promise<Transaction> {
        const transaction = await this.transactionsRepository.findOneBy({ id });
        if (!transaction) {
          throw new NotFoundException(`Transaction with id ${id} not found`);
        }
    
        transaction.status = status;
        return await this.transactionsRepository.save(transaction);
    }
}
