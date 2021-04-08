import { createConnection } from 'typeorm';
import { getExpressServer } from '../express-server';
import User from '../models/User';
import Role from '../models/Role';
import Language from '../models/Language';
import Message from '../models/Message';
import Note from '../models/Note';
import Appointement from '../models/Appointement';
import UserSession from '../models/UserSession';
import createTestClient from 'supertest';

const initializeTestClient = async (): Promise<
  createTestClient.SuperTest<createTestClient.Test>
> => {
  await createConnection({
    type: 'postgres',
    url: 'postgres://postgres:postgres@localhost:5432/deafstudy_test',
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, UserSession, Role, Language, Message, Note, Appointement],
  });

  const { expressServer } = await getExpressServer();
  const testClient = createTestClient(expressServer);

  return testClient;
};

export default initializeTestClient;
