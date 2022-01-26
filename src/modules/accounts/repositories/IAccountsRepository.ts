import { Account } from '@prisma/client';
import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';

export interface IAccountsRepository {
  create(data: ICreateAccountDTO): Promise<Account>;
}
