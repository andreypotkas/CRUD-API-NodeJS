import http, { IncomingMessage } from 'http';
import * as uuid from 'uuid';
import users from '../db/users.js';
import { findUserById } from './findUsers.js';
export async function deleteUser(
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
      users.splice(
        users.findIndex((user) => user.id === id),
        1
      );
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User ${id} deleted successfully!` }));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'UserId is invalid' }));
  }
}
