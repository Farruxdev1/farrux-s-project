import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.UserRepository.create(createUserDto);
      return await this.UserRepository.save(user);
  }

  async findAll() {
    return await this.UserRepository.find();
  }

  async findOne(id: string) {
    return await this.UserRepository.findOne({
      where: { id }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto);

    return await this.UserRepository.save(user);
  }

  async remove(id: string) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }
    return await this.UserRepository.remove(city);
  }

  async find(email: string) {
    return await this.UserRepository.findOne({ where: { email: email } });
  }

async validateUser(email: string, password: string): Promise<User | null> {
  const user = await this.find(email);
  if (!user) return null;

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return null;

  return user;
}

}
