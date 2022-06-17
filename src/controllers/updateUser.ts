import http from 'http';
import * as uuid from 'uuid';
import users from '../db/users.js';
import { IUser } from '../models/models.js';
import { findUserById } from './findUsers.js';
export async function updateUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) {
  const user = findUserById(id);
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server not found' }));
  }
}
