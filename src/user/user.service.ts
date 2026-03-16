import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create({
      ...createUserDto,
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findMe(id: string) {
    return await this.userRepository.findMe(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, password } = updateUserDto;

    return await this.userRepository.update(id, {
      email,
      password,
    });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(id);
    return;
  }
}
