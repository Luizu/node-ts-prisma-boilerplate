import { ICreateAccountDTO } from '@modules/accounts/dtos/ICreateAccountDTO';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { Account } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountRepository: IAccountsRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateAccountDTO): Promise<Account> {
    if (!name || !email || !password) {
      throw new AppError('Missing data to create an account', 403);
    }

    const account = await this.accountRepository.create({
      name,
      email,
      password,
    });

    return account;
  }
}
