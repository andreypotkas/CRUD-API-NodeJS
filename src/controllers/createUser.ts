import http, { IncomingMessage } from 'http';
import * as uuid from 'uuid';
import users from '../db/users.js';
import { IUser } from '../models/models.js';
import { getRequestData } from '../utils/getRequestData.js';
export async function createUser(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  try {
    const user = await getRequestData(req);
    const newUser = { id: uuid.v4(), ...user };
    users.push(newUser);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server not found' }));
  }
}
