import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionRepository } from './transaction.repository';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [SequelizeModule.forFeature([Transaction]), AccountModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService],
})
export class TransactionModule {}
