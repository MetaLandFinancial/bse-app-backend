import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({ name: 'users' })
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    username: string;
  
    @Column({ type: 'varchar', length: 255 })
    password_hash: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column('numeric', { precision: 20, scale: 2, default: 0 })
    balance: number;

    @Column('numeric', { precision: 20, scale: 2, default: 0 })
    availabel_balance: number;
  }
  