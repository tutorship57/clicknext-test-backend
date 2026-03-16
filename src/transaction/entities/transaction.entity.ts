import {
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Account } from 'src/account/entities/account.entity';
@Table
export class Transaction extends Model {
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM('ฝาก', 'ถอน'),
    allowNull: false,
  })
  declare status: 'ฝาก' | 'ถอน';

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare amount: number;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare accountId: string;

  @BelongsTo(() => Account)
  declare account: Account;
}
