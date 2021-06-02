import { Server } from 'socket.io';
import http from 'http';
import { getExpressServer } from './express-server';

export const getIoServer = async (): Promise<Server> => {
  const { expressServer } = await getExpressServer();
  const server = http.createServer(expressServer);
  const io = new Server(server);
  return io;
};
