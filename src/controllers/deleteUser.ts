import http, { IncomingMessage } from 'http';
import * as uuid from 'uuid';
import users from '../db/users.js';
import { IUser } from '../models/models.js';
import { getRequestData } from '../utils/getRequestData.js';
export async function deleteUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) {
  try {
    users.splice(
      users.findIndex((user) => user.id === id),
      1
    );
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User ${id} deleted successfully!` }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server not found' }));
  }
}
