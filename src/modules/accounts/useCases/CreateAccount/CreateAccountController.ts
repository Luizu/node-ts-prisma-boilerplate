import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAccountUseCase } from './CreateAccountUseCase';

export class CreateAccountController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAccountUC = container.resolve(CreateAccountUseCase);

    const account = await createAccountUC.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(account);
  }
}
