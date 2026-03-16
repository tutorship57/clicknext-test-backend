import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(private accountRepo: AccountRepository) {}
  async create(createUserDto: CreateAccountDto) {
    return this.accountRepo.create({
      ...createUserDto,
    });
  }
  async findByUserId(userId: string) {
    return this.accountRepo.findByUserId(userId);
  }
  async findOne(where: { id?: string; amount?: number }) {
    return this.accountRepo.findOne(where);
  }
  async updateBalance(id: string, newBalance: number) {
    return this.accountRepo.updateBalance(id, newBalance);
  }
}
