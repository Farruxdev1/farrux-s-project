import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransaction } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entity/transaction.entity';



@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private readonly citiesRepository:
      Repository<Transaction>
  ) {
  }
  async create(createTransactionDto: CreateTransaction) {
    const city = this.citiesRepository.create
      (createTransactionDto)
    return await this.citiesRepository.save(city);
  }

  async findAll() {
    return await this.citiesRepository.find()
  }

  async findOne(id: string) {
    return await this.citiesRepository.findOne({
      where: { id }
    });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const city = await this.findOne(id)
    if (!city) {
      throw new NotFoundException
    }
    Object.assign(city, updateTransactionDto)

    return await this.citiesRepository.save(city)
  }

  async remove(id: string) {
    const city = await this.findOne(id)
    if (!city) {
      throw new NotFoundException
    }
    return await this.citiesRepository.remove(city)
  }
}
