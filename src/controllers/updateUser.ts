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
  if (uuid.validate(id)) {
    const user = await findUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "User doesn't exist" }));
    } else {
      const newUser = await getRequestData(req);
      users.splice(
        users.findIndex((user) => user.id === id),
        1,
        newUser
      );
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'UserId is invalid' }));
  }
}
