import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto'; // Assuming you have a DTO for transaction creation
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) {}

  // Insert a new transaction
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.create(createTransactionDto);
  }

  // Query all transactions
  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionsService.findAll();
  }

  // Query transactions by user_id
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<Transaction[]> {
    return this.transactionsService.findByUserId(userId);
  }

  // Query a single transaction by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Transaction> {
    return this.transactionsService.findOne(id);
  }

    // Update transaction status
    @Patch(':id/status')
    async updateStatus(
      @Param('id') id: number,
      @Body('status') status: string,
    ): Promise<Transaction> {
      return this.transactionsService.updateStatus(id, status);
    }
}
