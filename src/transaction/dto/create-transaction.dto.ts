export class CreateTransactionDto {
    user_id: number;
    status: string;
    stock_symbol: string;
    quantity: number;
    price_per_share: number;
    total_price: number;
    transaction_type: string;
    transaction_timestamp: Date;
  }
  