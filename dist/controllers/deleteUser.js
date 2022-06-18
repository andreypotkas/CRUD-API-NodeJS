var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as uuid from 'uuid';
import users from '../db/users.js';
import { findUserById } from './findUsers.js';
export function deleteUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (uuid.validate(id)) {
            const user = yield findUserById(id);
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "User doesn't exist" }));
            }
            else {
                users.splice(users.findIndex((user) => user.id === id), 1);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `User ${id} deleted successfully!` }));
            }
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'UserId is invalid' }));
        }
    });
}
