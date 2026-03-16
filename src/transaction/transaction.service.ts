import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AccountService } from 'src/account/account.service';
import { Sequelize } from 'sequelize-typescript';
import { error } from 'console';

@Injectable()
export class TransactionService {
  constructor(
    private sequelize: Sequelize,
    private transactionRepo: TransactionRepository,
    private accountService: AccountService,
  ) {}

  async findAll(accountId: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.transactionRepo.getAll(
      accountId,
      limit,
      offset,
    );
    const meta = {
      total: count,
      page,
      limit,
      offset,
    };
    return { rows, meta };
  }

  async create(accountId: string, createTransactionDto: CreateTransactionDto) {
    const t = await this.sequelize.transaction();
    try {
      const account = await this.accountService.findOne({ id: accountId });

      if (!account) {
        throw new Error('Account Not found');
      }
      const status = createTransactionDto.status;
      const amount = Number(createTransactionDto.amount);
      if (status === 'ถอน' && account.balance < amount) {
        throw new Error('Account Balance is insufficient');
      }

      let newBalance = Number(account.balance);

      if (status === 'ถอน') {
        newBalance -= amount;
      } else {
        newBalance += amount;
      }

      await this.accountService.updateBalance(accountId, newBalance);
      const newTransaction =
        await this.transactionRepo.create(createTransactionDto);

      await t.commit();
      return newTransaction;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async update(
    transactionId: string,
    accountId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const t = await this.sequelize.transaction();
    try {
      const account = await this.accountService.findOne({
        id: accountId,
      });

      const oldTransaction = await this.transactionRepo.findOne({
        accountId,
        id: transactionId,
      });

      if (!account) {
        throw new Error('there is no account Exist');
      }

      if (!oldTransaction) {
        throw new Error('there is no transaction found');
      }
      const newAmount = Number(updateTransactionDto.amount);
      const status = oldTransaction.status;
      const difference = newAmount - Number(oldTransaction.amount);

      let newBalance = Number(account.balance);
      if (status === 'ถอน') {
        newBalance -= difference;
        if (newBalance < 0) {
          throw new Error('Account Balance is insufficient');
        }
      } else {
        newBalance += difference;
      }

      await this.accountService.updateBalance(accountId, newBalance);

      const newTransaction = await this.transactionRepo.updateAmount(
        transactionId,
        accountId,
        updateTransactionDto,
      );
      await t.commit();
      return newTransaction;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async delete(accountId: string, transactionId: string) {
    const t = await this.sequelize.transaction();
    console.log("hello",accountId,transactionId,"hello")
    try {
      const transaction = await this.transactionRepo.findOne({
        id: transactionId,
        accountId: accountId,
      });
      const account = await this.accountService.findOne({
        id: accountId,
      });
      if (!transaction) {
        throw new error('transaction not found');
      }
      if (!account) {
        throw new error('account not found');
      }
      let balance = Number(account.balance);
      const transactionAmount = Number(transaction.amount);

      // recover back the balance that why ถอน is +
      if (transaction.status === 'ถอน') {
        balance += transactionAmount;
      } else {
        balance -= transactionAmount;
        if (balance < 0) {
          throw new Error('insufficent balance');
          // on scenario when there are balance
          // which we want to recover that < the current balance
        }
      }
      await this.accountService.updateBalance(accountId, balance);
      await this.transactionRepo.delete(transactionId, accountId);
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
