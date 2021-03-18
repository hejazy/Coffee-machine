import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { CoffeePodController } from '../src/app/controllers';
import { CoffeePodsService } from '../src/app/services';

function mockCoffeePodModel() {
  this.findOne = () => 'got Coffee Pod';
  this.deleteOne = () => ({ok: true, deletedCount: 1});
  this.aggregate = () => ['Coffee Pod'];
  this.create = () => 'created Coffee Pod'
  this.findOneAndUpdate = () => 'updated Coffee Pod'
}
describe('CoffeePod (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [CoffeePodController],
      providers: [
        CoffeePodsService,
        {
          provide: getModelToken('coffee-pod'),
          useValue: new mockCoffeePodModel(),
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('/coffee-pod (GET)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .get('/')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect(['Coffee Pod']);
    });
  })

  describe('/coffee-pod/${id} (GET)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .get('/6053b651563ad0f37739a12d')
        .expect(200)
        .expect('got Coffee Pod');
    });
  })

  describe('/coffee-pod (POST)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({
          ref_name: "string",
          product_type: "COFFEE_POD_LARGE",
          coffee_flavor: "COFFEE_FLAVOR_VANILLA",
          pack_size: 1
        })
        .expect(201)
        .expect('created Coffee Pod');
    });
    it('wrong DTO', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({})
        .expect(400)
    });
  });

  describe('/coffee-pod/${id} (PATCH)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .patch('/6053b651563ad0f37739a12d')
        .send({pack_size: 1})
        .expect(200)
        .expect('updated Coffee Pod');
    });
    it('wrong DTO', () => {
      return request(app.getHttpServer())
        .patch('/6053b651563ad0f37739a12d')
        .send({pack_size: 0 })
        .expect(400)
    });
  });
});