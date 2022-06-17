import 'dotenv/config';
import http from 'http';
import { createUser } from './controllers/createUser.js';
import { getAllUsers, getNotFound, getUserById, } from './controllers/getUsers.js';
const server = http.createServer((req, res) => {
    var _a;
    if (req.url === '/api/users' && req.method === 'GET') {
        getAllUsers(req, res);
    }
    else if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res);
    }
    else if (((_a = req.url) === null || _a === void 0 ? void 0 : _a.match(/\/api\/users\/([0-9]+)/)) &&
        req.method === 'GET') {
        const id = req.url.split('/')[3];
        getUserById(req, res, id);
    }
    else {
        getNotFound(req, res);
    }
});
const PORT = process.env.PORT || '5000';
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
