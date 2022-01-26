import { v4 as uuidV4 } from 'uuid';
import { Account } from '@prisma/client';
import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO';
import { IAccountsRepository } from '../IAccountsRepository';

export class AccountsRepositoryInMemory implements IAccountsRepository {
  private accounts: Account[] = [];

  public async create(data: ICreateAccountDTO): Promise<Account> {
    const account = {
      id: uuidV4(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.accounts.push(account);

    return account;
  }
}
