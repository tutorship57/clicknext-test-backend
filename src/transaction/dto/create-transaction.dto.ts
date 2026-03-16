import { IsNotEmpty, IsEnum, IsNumber, IsUUID } from 'class-validator';
export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(['ฝาก', 'ถอน'])
  status: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;
}
