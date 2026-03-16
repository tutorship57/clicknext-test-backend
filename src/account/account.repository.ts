import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { userId } = createAccountDto;
    return await this.accountModel.create({
      userId,
    });
  }

  async findOne(where: { id?: string; balance?: number }) {
    return await this.accountModel.findOne({
      where,
    });
  }
  async findByUserId(userId: string) {
    return await this.accountModel.findOne({
      where: { userId },
    });
  }
  async updateBalance(id: string, newBalance: number) {
    return await this.accountModel.update(
      {
        balance: newBalance,
      },
      {
        where: { id },
      },
    );
  }
}
