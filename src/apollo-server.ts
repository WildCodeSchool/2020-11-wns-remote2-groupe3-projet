import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';
import { buildSchema } from 'type-graphql';
import { setSessionIdCookie } from './express-server';
import { getUserFromSessionId } from './models/User';
import AppointementResolver from './resolvers/AppointementResolver';
import LanguageResolver from './resolvers/LanguageResolver';
import MessageResolver from './resolvers/MessageResolver';
import NoteResolver from './resolvers/NoteResolver';
import RoleResolver from './resolvers/RoleResolver';
import UserResolver from './resolvers/UserResolver';

export const getApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [
      RoleResolver,
      UserResolver,
      LanguageResolver,
      AppointementResolver,
      NoteResolver,
      MessageResolver,
    ],
    dateScalarMode: 'isoDate',
  });

  const context = async ({ req, res }: { req: Request; res: Response }) => {
    const { sessionId } = req.cookies;
    const user = await getUserFromSessionId(sessionId);

    return {
      setSessionIdCookie: setSessionIdCookie(res),
      user,
    };
  };
  return new ApolloServer({ schema, context });
};
