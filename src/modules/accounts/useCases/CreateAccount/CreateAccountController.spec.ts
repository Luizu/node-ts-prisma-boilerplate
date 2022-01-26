import request from 'supertest';

import { prisma } from '@shared/infra/prisma';
import { app } from '@shared/infra/http/app';

describe('Create Account (E2E)', () => {
  jest.setTimeout(15000);

  afterEach(async () => {
    const deleteAccounts = prisma.account.deleteMany({});

    await prisma.$transaction([deleteAccounts]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should be able to create a new account', async () => {
    const response = await request(app).post('/account').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
    expect(response.status).toBe(201);
  });

  it('should not be able to create a new account if name is missing', async () => {
    const response = await request(app).post('/account').send({
      email: 'john@doe.com',
      password: '123456',
    });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Missing data to create an account');
  });

  it('should not be able to create a new account if email is missing', async () => {
    const response = await request(app).post('/account').send({
      name: 'John Doe',
      password: '123456',
    });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Missing data to create an account');
  });

  it('should not be able to create a new account if password is missing', async () => {
    const response = await request(app).post('/account').send({
      name: 'John Doe',
      email: 'john@doe.com',
    });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Missing data to create an account');
  });
});
