import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const photo = {
  name: 'Some photo e2e',
  description: 'Some description',
  filename: 'some file',
  views: 0,
  isPublished: false,
  user: 4,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Photo e2e', () => {
    it('/ (GET)', async () => {
      const data = await request(app.getHttpServer())
        .post('/photo')
        .send(photo)
        .expect(201);

      expect(data.body).toEqual({
        ...photo,
        id: expect.any(Number),
        status: 'draft',
        updated: expect.any(String),
        created: expect.any(String),
      });

      console.log(`Item was added at ID ${data.body.id}`);
      return request(app.getHttpServer())
        .delete(`/photo/${data.body.id}`)
        .expect(200);
    });
  });
});
