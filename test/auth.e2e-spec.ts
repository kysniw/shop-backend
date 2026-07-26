import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setupApp';

describe('Auth System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'John',
        surname: 'Smith',
        email: 'ab@example.com',
        password: 'password123',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body as {
          id: number;
          email: string;
        };
        expect(id).toBeDefined();
        expect(email).toEqual('ab@example.com');
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    await request(app.getHttpServer()).post('/auth/signout');
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'John',
        surname: 'Smith',
        email: 'ab@example.com',
        password: 'password123',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual('ab@example.com');
  });
});
