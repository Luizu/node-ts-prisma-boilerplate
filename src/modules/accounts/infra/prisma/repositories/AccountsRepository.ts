import { prisma } from '@shared/infra/prisma';
import { Account } from '@prisma/client';
import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';

export class AccountsRepository implements IAccountsRepository {
  private ormRepository = prisma.account;

  public async create(data: ICreateAccountDTO): Promise<Account> {
    const account = await this.ormRepository.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return account;
  }
}
