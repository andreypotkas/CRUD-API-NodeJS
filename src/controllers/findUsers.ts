import users from '../db/users.js';
import { IUser } from '../models/models.js';

export function findAllUsers() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export function findUserById(id: string) {
  return new Promise((resolve, reject) => {
    const user = users.find((user: IUser) => user.id === id);
    resolve(user);
  });
}
