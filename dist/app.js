import 'dotenv/config';
import http from 'http';
import * as uuid from 'uuid';
import { createUser } from './controllers/createUser.js';
import { deleteUser } from './controllers/deleteUser.js';
import { getAllUsers, getNotFound, getUserById, } from './controllers/getUsers.js';
import { updateUser } from './controllers/updateUser.js';
const server = http.createServer((req, res) => {
    try {
        if (req.url === '/api/users' && req.method === 'GET') {
            getAllUsers(res);
        }
        else if (req.url === '/api/users' && req.method === 'POST') {
            createUser(req, res);
        }
        else if (req.url.split('/')[3] && req.method === 'GET') {
            const id = req.url.split('/')[3];
            getUserById(res, id);
        }
        else if (req.url.split('/')[3] && req.method === 'PUT') {
            const id = req.url.split('/')[3];
            updateUser(req, res, id);
        }
        else if (uuid.validate(req.url.split('/')[3]) &&
            req.method === 'DELETE') {
            const id = req.url.split('/')[3];
            deleteUser(req, res, id);
        }
        else {
            getNotFound(req, res);
        }
    }
    catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err));
    }
});
const PORT = process.env.PORT || '5000';
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
