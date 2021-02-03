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

describe('User resolvers', () => {
  let testClient: createTestClient.SuperTest<createTestClient.Test>;
  beforeEach(async () => {
    await createConnection({
      type: 'postgres',
      url: 'postgres://postgres:postgres@localhost:5432/deafstudy_test',
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
    const user1 = User.create({
      firstname: 'Baptiste',
      lastname: 'Gislot',
      email: 'b.g@gmail.com',
      password: 'tototata',
    });
    await user1.save();
    const user2 = User.create({
      firstname: 'Hélèna',
      lastname: 'Thomassin',
      email: 't.h@gmail.com',
      password: 'tototata',
    });
    await user2.save();
  });
  afterEach(() => {
    const connection = getConnection();
    return connection.close();
  });
  describe('Query all users', () => {
    it('Returns all users', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
          users {
            id
            firstname
            lastname
            email
          }
        }
        `,
      });
      expect(JSON.parse(response.text).data).toEqual({
        users: [
          {
            id: '1',
            firstname: 'Baptiste',
            lastname: 'Gislot',
            email: 'b.g@gmail.com',
          },
          {
            id: '2',
            firstname: 'Hélèna',
            lastname: 'Thomassin',
            email: 't.h@gmail.com',
          },
        ],
      });
    });
  });
  describe('Query one specific user', () => {
    it('Returns the user associated to the specified ID', async () => {
      const response = await testClient.post('/graphql').send({
        query: `{
          user(id: "2") {
            id
            firstname
            lastname
            email
          }
        }
        `,
      });
      expect(JSON.parse(response.text).data).toEqual({
        user: {
          id: '2',
          firstname: 'Hélèna',
          lastname: 'Thomassin',
          email: 't.h@gmail.com',
        },
      });
    });
  });
  describe('Query me', () => {
    describe('When user is not logged in.', () => {
      it('Returns error', async () => {
        const response = await testClient.post('/graphql').send({
          query: `{
            me {
              firstname
              lastname
            }
          }`,
        });
        expect(response.text).toMatch('You are not authenticated');
      });
    });
    describe('When user is logged in.', () => {
      it('Returns the user.', async () => {
        const user = await User.findOne({ where: { id: '1' } });
        const userSession = UserSession.create({ user });
        await userSession.save();
        const response = await testClient
          .post('/graphql')
          .set('Cookie', [`sessionId=${userSession.sessionId}`])
          .send({
            query: `{
              me {
                firstname
                lastname
              }
            }`,
          });
        expect(JSON.parse(response.text).data).toEqual({
          me: {
            firstname: user?.firstname,
            lastname: user?.lastname,
          },
        });
      });
    });
    describe('When password matches user password', () => {
      it('Creates user session and sets cookie with user session ID', async () => {
        const response = await testClient.post('/graphql').send({
          query: `mutation {
            createSession(
              credentials: {
                email: "b.g@gmail.com"
                password: "tototata"
              }
            ) {
              id
              email
              firstname
              lastname
            }
          }`,
        });
        expect(JSON.parse(response.text).data.createSession).toEqual({
          id: '1',
          email: 'b.g@gmail.com',
          firstname: 'Baptiste',
          lastname: 'Gislot',
        });
        const userSession = await UserSession.findOneOrFail({
          where: { user: '1' },
        });
        const cookie = response.header['set-cookie'][0];
        expect(cookie).toMatch(
          `sessionId=${userSession.sessionId}; Max-Age=3692000; Path=/;`
        );
      });
    });
  });
  describe('Mutation createUser', () => {
    it('Creates and returns the user', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          createUser(
            data: {
              firstname: "Zinedine"
              lastname: "Zidane"
              email: "champion@zizou.zz"
              password: "Coup2Boule"
            }
          ) {
            id
            firstname
            lastname
            email
          }
        }`,
      });
      expect(await User.count({})).toEqual(2);
      expect(JSON.parse(response.text).data).toEqual({
        createUser: {
          id: '3',
          firstname: 'Zinedine',
          lastname: 'Zidane',
          email: 'champion@zizou.zz',
        },
      });
    });
  });
  describe('Mutation updateUserInfo', () => {
    it('Updates the informations of the specified user and returns the user', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          updateUserInfo(
            data: {
              id: "1"
              firstname: "Benjamin"
            }
          ) {
            id
            firstname
            lastname
          }
        }`,
      });
      expect(JSON.parse(response.text).data).toEqual({
        updateUserInfo: {
          id: '1',
          firstname: 'Benjamin',
          lastname: 'Gislot',
        },
      });
    });
  });
  describe('Mutation setUserRole', () => {
    it('Add a the specified role to a specified user.', async () => {
      const role = Role.create({
        role: 'Admin',
      });
      await role.save();
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          setUserRole(
            data: {
              id: "1"
              roleId: "1"
            }
          ) {
            id
            firstname
            lastname
          }
        }`,
      });
      expect(JSON.parse(response.text).data).toEqual({
        setUserRole: {
          id: '1',
          firstname: 'Baptiste',
          lastname: 'Gislot',
        },
      });
    });
  });
  describe('Mutation setUserLanguage', () => {
    it('Add the specified language to a specified user.', async () => {
      const language = Language.create({
        language: 'FR',
      });
      await language.save();
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          setUserLanguage(
            data: {
              id: "1"
              languagesId: "1"
            }
          ) {
            id
            firstname
            lastname
          }
        }`,
      });
      expect(JSON.parse(response.text).data).toEqual({
        setUserLanguage: {
          id: '1',
          firstname: 'Baptiste',
          lastname: 'Gislot',
        },
      });
    });
  });
  describe('Mutation deleteUser', () => {
    it('Delete the specified user and returns it.', async () => {
      const response = await testClient.post('/graphql').send({
        query: `mutation {
          deleteUser(
            id: "2"
          )
        }`,
      });
      expect(await User.count({})).toEqual(1);
      expect(JSON.parse(response.text).data).toEqual({
        deleteUser: 'User has been deleted.',
      });
    });
  });
});
