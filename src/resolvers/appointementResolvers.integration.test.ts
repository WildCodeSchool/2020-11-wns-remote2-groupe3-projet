import createTestClient from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import { getExpressServer } from '../express-server';

import UserSession from '../models/UserSession';
import User from '../models/User';
import Role from '../models/Role';
import Language from '../models/Language';
import Message from '../models/Message';
import Note from '../models/Note';
import Appointement from '../models/Appointement';

describe('Appointement resolvers', () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>;

  beforeEach(async () => {
    await createConnection({
      type: 'postgres',
      url: 'postgres://postgres:postgres@localhost:5433/deafstudy_test',
      dropSchema: true,
      synchronize: true,
      logging: false,
      entities: [
        User,
        UserSession,
        Role,
        Language,
        Message,
        Note,
        Appointement,
      ],
    });

    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);

    const user = User.create({
      firstname: 'Hélèna',
      lastname: 'Thomassin',
      email: 't.h@gmail.com',
      password: 'postgres',
    });
    await user.save();

    const interpreter = User.create({
      firstname: 'Baptiste',
      lastname: 'Gislot',
      email: 'b.g@gmail.com',
      password: 'tototata',
    });
    await interpreter.save();

    const appointement1 = Appointement.create();
    appointement1.title = 'cours histoire';
    appointement1.status = 'en cours';
    appointement1.start_at = new Date('2021-02-21');
    appointement1.end_at = new Date('2021-02-25');
    appointement1.color = 'red';
    appointement1.user = user;
    appointement1.interpreter = interpreter;
    await appointement1.save();

    const appointement2 = Appointement.create();
    appointement2.title = 'cours de math';
    appointement2.status = 'done';
    appointement2.start_at = new Date('2021-03-21');
    appointement2.end_at = new Date('2021-03-25');
    appointement2.color = 'blue';
    appointement2.user = user;
    appointement2.interpreter = interpreter;
    await appointement2.save();
  });

  afterEach(() => {
    const connection = getConnection();
    return connection.close();
  });

  describe('Query all appointements', () => {
    it('Returns all appointements', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
          appointements {
            id
            title
            status
          }
        }
        `,
      });

      expect(JSON.parse(response.text).data).toEqual({
        appointements: [
          {
            id: '1',
            title: 'cours histoire',
            status: 'en cours',
          },
          {
            id: '2',
            title: 'cours de math',
            status: 'done',
          },
        ],
      });
    });
  });

  describe('Query one specific appointement', () => {
    it('Return the appointement associated to the specific ID', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
          appointement(id: "2") {
            id
            title
            status
            start_at
            end_at
            color
          }
        }
        `,
      });

      expect(JSON.parse(response.text).data).toEqual({
        appointement: {
          id: '2',
          title: 'cours de math',
          status: 'done',
          start_at: new Date('2021-03-21').getTime().toString(),
          end_at: new Date('2021-03-25').getTime().toString(),
          color: 'blue',
        },
      });
    });
  });
});