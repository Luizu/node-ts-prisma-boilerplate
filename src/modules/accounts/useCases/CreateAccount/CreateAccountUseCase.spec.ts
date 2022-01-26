import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateAccountUseCase } from './CreateAccountUseCase';

let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let createAccountUC: CreateAccountUseCase;

describe('Create Account (Unit)', () => {
  beforeEach(() => {
    accountsRepositoryInMemory = new AccountsRepositoryInMemory();
    createAccountUC = new CreateAccountUseCase(accountsRepositoryInMemory);
  });

  it('should be able to create a new account', async () => {
    const account = await createAccountUC.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(account).toHaveProperty('id');
    expect(account.name).toBe('John Doe');
    expect(account.email).toBe('john@doe.com');
  });

  it('should not be able to create a new account if name is missing', async () => {
    await expect(
      createAccountUC.execute({
        name: null,
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new account if email is missing', async () => {
    await expect(
      createAccountUC.execute({
        name: 'John Doe',
        email: null,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new account if password is missing', async () => {
    await expect(
      createAccountUC.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
