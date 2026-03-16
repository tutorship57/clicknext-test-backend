import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { Post, Body } from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getAll(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    const accountId: string = req.user.accountId;
    return this.transactionService.findAll(accountId, page, limit);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  create(@Req() req, @Body() CreateTransactionDto: CreateTransactionDto) {
    const accountId: string = req.user.accountId;
    if (accountId !== CreateTransactionDto.accountId) {
      throw new UnauthorizedException();
    }
    return this.transactionService.create(accountId, CreateTransactionDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') transactionId: string,
    @Body() UpdateTransactionDto: UpdateTransactionDto,
  ) {
    const accountId: string = req.user.accountId;

    return this.transactionService.update(
      transactionId,
      accountId,
      UpdateTransactionDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Req() req, @Param('id') transactionId) {
    const accountId: string = req.user.accountId;
    await this.transactionService.delete(accountId, transactionId as string);
  }
}
