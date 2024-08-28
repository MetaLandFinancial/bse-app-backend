import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 20 })
    status: string;

    @Column({ length: 10 })
    stock_symbol: string;

    @Column()
    quantity: number;

    @Column('numeric', { precision: 10, scale: 2 })
    price_per_share: number;

    @Column('numeric', { precision: 10, scale: 2 })
    total_price: number;

    @Column({ length: 10 })
    transaction_type: string;

    @Column('timestamp without time zone')
    transaction_timestamp: Date;
}
