import http from 'http';
import { findAllUsers, findUserById } from './findUsers.js';
import * as uuid from 'uuid';

export async function getAllUsers(res: http.ServerResponse): Promise<void> {
  try {
    const users = await findAllUsers();

    if (!users) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Users not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server not found' }));
  }
}
export async function getUserById(
  res: http.ServerResponse,
  id: string
): Promise<void> {
  if (uuid.validate(id)) {
    const user = await findUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "User doesn't exist" }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'UserId is invalid' }));
  }
}
export async function getNotFound(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Page not found' }));
}
