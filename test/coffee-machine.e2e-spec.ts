import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { CoffeeMachineController } from '../src/app/controllers';
import { CoffeeMachinesService } from '../src/app/services';

function mockCoffeeMachineModel() {
  this.findOne = () => 'got Coffee Machine';
  this.deleteOne = () => ({ok: true, deletedCount: 1});
  this.aggregate = () => ['Coffee Machine'];
  this.create = () => 'created Coffee Machine'
  this.findOneAndUpdate = () => 'updated Coffee Machine'
}
describe('CoffeeMachine (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [CoffeeMachineController],
      providers: [
        CoffeeMachinesService,
        {
          provide: getModelToken('coffee-machine'),
          useValue: new mockCoffeeMachineModel(),
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('/coffee-machine (GET)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .get('/')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect(['Coffee Machine']);
    });
  })

  describe('/coffee-machine/${id} (GET)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .get('/6053b651563ad0f37739a12d')
        .expect(200)
        .expect('got Coffee Machine');
    });
  })

  describe('/coffee-machine (POST)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({
          ref_name: "string",
          product_type: "COFFEE_MACHINE_LARGE",
          water_line_compatible: true
        })
        .expect(201)
        .expect('created Coffee Machine');
    });
    it('wrong DTO', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({})
        .expect(400)
    });
  });

  describe('/coffee-machine/${id} (PATCH)', () => {
    it('correct request', () => {
      return request(app.getHttpServer())
        .patch('/6053b651563ad0f37739a12d')
        .send({product_type: "COFFEE_MACHINE_LARGE", water_line_compatible: true})
        .expect(200)
        .expect('updated Coffee Machine');
    });
    it('wrong DTO', () => {
      return request(app.getHttpServer())
        .patch('/6053b651563ad0f37739a12d')
        .send({ name: 123 })
        .expect(400)
    });
  });
});