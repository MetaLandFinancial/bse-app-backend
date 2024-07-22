import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { EventsGateway } from './events.gateway';

@Injectable()
export class BlockchainService implements OnModuleInit {
  private readonly logger = new Logger(BlockchainService.name);
  private provider: ethers.Provider;
  private usdtContract: ethers.Contract;

  private readonly USDT_CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // ERC-20 USDT Contract Address
  private readonly INFURA_PROJECT_ID = 'YOUR_INFURA_PROJECT_ID';
  private readonly ABI = [
    "event Transfer(address indexed from, address indexed to, uint value)"
  ];

  constructor(private readonly eventsGateway: EventsGateway) {}

  onModuleInit() {
    this.provider = new ethers.InfuraProvider('mainnet', this.INFURA_PROJECT_ID);
    this.usdtContract = new ethers.Contract(this.USDT_CONTRACT_ADDRESS, this.ABI, this.provider);

    this.listenToDeposits();
  }

  private listenToDeposits() {
    this.usdtContract.on('Transfer', (from, to, value, event) => {
      this.handleDeposit(from, to, value, event);
    });

    this.logger.log('Listening for USDT deposits...');
  }

  private async handleDeposit(from: string, to: string, value: any, event: any) {
    const formattedValue = ethers.formatUnits(value, 6);
    this.logger.log(`Deposit detected: from ${from}, to ${to}, value ${formattedValue}`);
    // Notify clients about the deposit
    this.eventsGateway.notifyDeposit({ from, to, value: formattedValue });
    // Add your business logic here (e.g., update user balance in the database)
  }

  async check() {
    
  }
}
