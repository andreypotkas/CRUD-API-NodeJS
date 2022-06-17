import 'dotenv/config';
import http from 'http';
import { createUser } from './controllers/createUser.js';
import {
  getAllUsers,
  getNotFound,
  getUserById,
} from './controllers/getUsers.js';

const server: http.Server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getAllUsers(req, res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (
      req.url?.match(/\/api\/users\/([0-9]+)/) &&
      req.method === 'GET'
    ) {
      const id = req.url.split('/')[3];
      getUserById(req, res, id);
    } else {
      getNotFound(req, res);
    }
  }
);

const PORT: string = process.env.PORT || '5000';

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
