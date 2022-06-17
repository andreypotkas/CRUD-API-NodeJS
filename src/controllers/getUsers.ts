import http from 'http';
import { findAllUsers, findUserById } from './findUsers.js';

export async function getAllUsers(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
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
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) {
  try {
    const user = await findUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server not found' }));
  }
}
export async function getNotFound(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Page not found' }));
}
