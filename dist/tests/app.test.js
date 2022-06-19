var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import server from '../app.js';
import request from 'supertest';
describe('Testing CRUD API', function () {
    describe('Scenario 1 with one user', function () {
        var user = {
            username: 'Max',
            age: 17,
            hobbies: ['swimming', 'reading'],
        };
        var id = '';
        it('Should return all users (empty array by default)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get('/api/users')];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should create new user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).post('/api/users').send(user)];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toBe(201);
                        expect(res.body.username).toBe('Max');
                        expect(res.body.age).toBe(17);
                        expect(res.body.hobbies).toEqual(['swimming', 'reading']);
                        id = res.body.id;
                        user = res.body;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should return user by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get("/api/users/".concat(id))];
                    case 1:
                        response = _a.sent();
                        expect(response.body.id).toEqual("".concat(id));
                        expect(response.body.username).toEqual('Max');
                        expect(response.body.age).toEqual(17);
                        expect(response.body.hobbies).toEqual(['swimming', 'reading']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should update user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user.username = 'Andrey';
                        user.age = 27;
                        user.hobbies = ['1', '2'];
                        return [4 /*yield*/, request(server).put("/api/users/".concat(id)).send(user)];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toBe(200);
                        expect(res.body.id).toEqual("".concat(id));
                        expect(res.body.username).toBe('Andrey');
                        expect(res.body.age).toBe(27);
                        expect(res.body.hobbies).toEqual(['1', '2']);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should delete user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).delete("/api/users/".concat(id))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, request(server).get('/api/users')];
                    case 2:
                        response = _a.sent();
                        expect(response.body).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should return message: User doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get("/api/users/".concat(id))];
                    case 1:
                        res = _a.sent();
                        expect(res.body.message).toEqual("User doesn't exist");
                        expect(res.statusCode).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        server.close();
    });
    describe('Scenario 2 with several users', function () {
        var users = [
            {
                username: 'Max',
                age: 17,
                hobbies: ['swimming', 'reading'],
            },
            {
                username: 'Andrey',
                age: 17,
                hobbies: ['boxing', 'running'],
            },
            {
                username: 'Nik',
                age: 17,
                hobbies: ['boxing', 'running'],
            },
        ];
        var id1 = '';
        var id2 = '';
        var id3 = '';
        var id4 = '';
        it('Should create 3 new users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res1, res2, res3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).post('/api/users').send(users[0])];
                    case 1:
                        res1 = _a.sent();
                        return [4 /*yield*/, request(server).post('/api/users').send(users[1])];
                    case 2:
                        res2 = _a.sent();
                        return [4 /*yield*/, request(server).post('/api/users').send(users[2])];
                    case 3:
                        res3 = _a.sent();
                        expect(res1.statusCode).toBe(201);
                        expect(res2.statusCode).toBe(201);
                        expect(res3.statusCode).toBe(201);
                        expect(res1.body.username).toBe('Max');
                        expect(res2.body.username).toBe('Andrey');
                        expect(res3.body.username).toBe('Nik');
                        expect(res1.body.age).toBe(17);
                        expect(res2.body.age).toBe(17);
                        expect(res3.body.age).toBe(17);
                        expect(res1.body.hobbies).toEqual(['swimming', 'reading']);
                        expect(res2.body.hobbies).toEqual(['boxing', 'running']);
                        expect(res3.body.hobbies).toEqual(['boxing', 'running']);
                        id1 = res1.body.id;
                        id2 = res2.body.id;
                        id3 = res3.body.id;
                        users[0] = res1.body;
                        users[1] = res2.body;
                        users[2] = res3.body;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should return all users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get('/api/users')];
                    case 1:
                        response = _a.sent();
                        expect(response.body.length).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should create new user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).post('/api/users').send(users[0])];
                    case 1:
                        res = _a.sent();
                        expect(res.statusCode).toBe(201);
                        expect(res.body.username).toBe('Max');
                        expect(res.body.age).toBe(17);
                        expect(res.body.hobbies).toEqual(['swimming', 'reading']);
                        id4 = res.body.id;
                        users[3] = res.body;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should return new count of users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get('/api/users')];
                    case 1:
                        response = _a.sent();
                        expect(response.body.length).toEqual(4);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should delete users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res1, res2, res3, res4, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).delete("/api/users/".concat(id1))];
                    case 1:
                        res1 = _a.sent();
                        return [4 /*yield*/, request(server).delete("/api/users/".concat(id2))];
                    case 2:
                        res2 = _a.sent();
                        return [4 /*yield*/, request(server).delete("/api/users/".concat(id3))];
                    case 3:
                        res3 = _a.sent();
                        return [4 /*yield*/, request(server).delete("/api/users/".concat(id4))];
                    case 4:
                        res4 = _a.sent();
                        return [4 /*yield*/, request(server).get('/api/users')];
                    case 5:
                        response = _a.sent();
                        expect(response.body).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        server.close();
    });
    describe('Scenario 3 with error handlings', function () {
        var invalidUser = {
            username: 'Nik',
            age: 17,
        };
        var user = {
            username: 'Nik',
            age: 17,
            hobbies: ['boxing', 'running'],
        };
        it('Request on non existing endpoint should return message: Page not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get("/api/")];
                    case 1:
                        response = _a.sent();
                        expect(response.body.message).toEqual("Page not found");
                        expect(response.statusCode).toEqual(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Request with non existing id should return message: User doesn't exist ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get("/api/users/1c4538d4-22d7-47d6-b23f-d2c99fd3c96f")];
                    case 1:
                        response = _a.sent();
                        expect(response.body.message).toEqual("User doesn't exist");
                        expect(response.statusCode).toEqual(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Request with invalid uuid id should return message: UserId is invalid ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).get("/api/users/1c4538d4-22d7-47d6")];
                    case 1:
                        response = _a.sent();
                        expect(response.body.message).toEqual("UserId is invalid");
                        expect(response.statusCode).toEqual(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("POST request without required field should return message: Request body doesn't contain required fields ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server)
                            .post("/api/users")
                            .send(invalidUser)];
                    case 1:
                        response = _a.sent();
                        expect(response.body.message).toEqual("Request body doesn't contain required fields");
                        expect(response.statusCode).toEqual(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("PUT request without required field should return message: Request body doesn't contain required fields ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server).post('/api/users').send(user)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, request(server)
                                .put("/api/users/".concat(res.body.id))
                                .send(invalidUser)];
                    case 2:
                        response = _a.sent();
                        expect(response.body.message).toEqual("Request body doesn't contain required fields");
                        expect(response.statusCode).toEqual(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('PUT request with invalid uuid id should return message: UserId is invalid ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(server)
                            .put("/api/users/awdawdawdawdadw")
                            .send(invalidUser)];
                    case 1:
                        response = _a.sent();
                        expect(response.body.message).toEqual("UserId is invalid");
                        expect(response.statusCode).toEqual(400);
                        return [2 /*return*/];
                }
            });
        }); });
        server.close();
    });
});
