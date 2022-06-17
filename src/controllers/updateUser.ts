import http from 'http';
import * as uuid from 'uuid';
import users from '../db/users.js';
import { IUser } from '../models/models.js';
import { getRequestData } from '../utils/getRequestData.js';
import { findUserById } from './findUsers.js';

export async function updateUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) {
  const newUser = await getRequestData(req);
  users.splice(
    users.findIndex((user) => user.id === id),
    1,
    newUser
  );
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server not found' }));
  }
}
