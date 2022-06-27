import 'dotenv/config';
import http from 'http';
import * as uuid from 'uuid';
import { createUser } from './controllers/createUser.js';
import { deleteUser } from './controllers/deleteUser.js';
import { getAllUsers, getNotFound, getUserById, } from './controllers/getUsers.js';
import { updateUser } from './controllers/updateUser.js';
var server = http.createServer(function (req, res) {
    try {
        if (req.url === '/api/users' && req.method === 'GET') {
            getAllUsers(res);
        }
        else if (req.url === '/api/users' && req.method === 'POST') {
            createUser(req, res);
        }
        else if (req.url.split('/')[3] && req.method === 'GET') {
            var id = req.url.split('/')[3];
            getUserById(res, id);
        }
        else if (req.url.split('/')[3] && req.method === 'PUT') {
            var id = req.url.split('/')[3];
            updateUser(req, res, id);
        }
        else if (uuid.validate(req.url.split('/')[3]) &&
            req.method === 'DELETE') {
            var id = req.url.split('/')[3];
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
var PORT = process.env.PORT || '5000';
server.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
export default server;
