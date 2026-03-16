import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
