import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { getExpressServer } from './express-server';
import * as dotenv from 'dotenv';

const main = async () => {
  dotenv.config();
  await createConnection();

  const { expressServer, apolloServer } = await getExpressServer();
  expressServer.listen({ port: 4000 }),
    () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
      );
  console.log('Server has started !');
};

main();
