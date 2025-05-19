import { PartialType } from '@nestjs/mapped-types';
import { CreateTransaction } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransaction) {}
