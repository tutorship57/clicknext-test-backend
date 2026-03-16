import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { status, amount, accountId } = createTransactionDto;
    return this.transactionModel.create({
      status,
      amount,
      accountId,
    });
  }
  async findOne(where: { id?: string; accountId?: string; status?: string }) {
    return this.transactionModel.findOne({
      where,
    });
  }

  async getAll(accountId: string, limit: number, offset: number) {
    return await this.transactionModel.findAndCountAll({
      limit: limit,
      offset: offset,
      where: { accountId },
      order: [['createdAt', 'DESC']],
    });
    // return this.transactionModel.findAll({
    //   where: { accountId },
    // });
  }

  async updateAmount(
    id: string,
    accountId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionModel.update(updateTransactionDto, {
      where: { id, accountId },
    });
  }

  async delete(id: string, accountId: string) {
    return await this.transactionModel.destroy({
      where: {
        id,
        accountId,
      },
    });
  }
}
