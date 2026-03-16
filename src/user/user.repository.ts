import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Account } from 'src/account/entities/account.entity';
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return await this.userModel.create({
      email,
      password,
    });
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findMe(id: string) {
    return await this.userModel.findOne({
      attributes: ['id', 'email'],
      where: { id },
      include: [
        {
          model: Account,
          attributes: ['id', 'balance'],
        },
      ],
    });
  }

  async findOne(id: string) {
    return await this.userModel.findByPk(id);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async remove(id: string) {
    return await this.userModel.destroy({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.update(updateUserDto, { where: { id } });
  }
}
