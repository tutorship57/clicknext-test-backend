import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './entities/account.entity';
import { AccountRepository } from './account.repository';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService],
})
export class AccountModule {}
