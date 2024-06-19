import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('email_codes')
export class EmailCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: number;

  @Column()
  level: string;

  @Column({ length: 255 })
  email_code: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;
}
