import { Column, Model, DataType, Table, HasOne } from 'sequelize-typescript';
import { Account } from 'src/account/entities/account.entity';
@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @HasOne(() => Account)
  declare account: Account;
}
