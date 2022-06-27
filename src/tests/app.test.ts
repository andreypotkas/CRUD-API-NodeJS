import server from '../app.js';
import request from 'supertest';

describe('Testing CRUD API', () => {
  describe('Scenario 1 with one user', () => {
    let user = {
      username: 'Max',
      age: 17,
      hobbies: ['swimming', 'reading'],
    };
    let id = '';
    it('Should return all users (empty array by default)', async () => {
      const response = await request(server).get('/api/users');
      expect(response.body).toEqual([]);
    });
    it('Should create new user', async () => {
      const res = await request(server).post('/api/users').send(user);

      expect(res.statusCode).toBe(201);
      expect(res.body.username).toBe('Max');
      expect(res.body.age).toBe(17);
      expect(res.body.hobbies).toEqual(['swimming', 'reading']);

      id = res.body.id;
      user = res.body;
    });
    it('Should return user by id', async () => {
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.body.id).toEqual(`${id}`);
      expect(response.body.username).toEqual('Max');
      expect(response.body.age).toEqual(17);
      expect(response.body.hobbies).toEqual(['swimming', 'reading']);
    });
    it('Should update user', async () => {
      user.username = 'Andrey';
      user.age = 27;
      user.hobbies = ['1', '2'];
      const res = await request(server).put(`/api/users/${id}`).send(user);

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toEqual(`${id}`);
      expect(res.body.username).toBe('Andrey');
      expect(res.body.age).toBe(27);
      expect(res.body.hobbies).toEqual(['1', '2']);
    });
    it('Should delete user', async () => {
      const res = await request(server).delete(`/api/users/${id}`);
      const response = await request(server).get('/api/users');
      expect(response.body).toEqual([]);
    });
    it("Should return message: User doesn't exist", async () => {
      const res = await request(server).get(`/api/users/${id}`);
      expect(res.body.message).toEqual("User doesn't exist");
      expect(res.statusCode).toBe(404);
    });
    server.close();
  });

  describe('Scenario 2 with several users', () => {
    let users = [
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
    let id1 = '';
    let id2 = '';
    let id3 = '';
    let id4 = '';

    it('Should create 3 new users', async () => {
      const res1 = await request(server).post('/api/users').send(users[0]);
      const res2 = await request(server).post('/api/users').send(users[1]);
      const res3 = await request(server).post('/api/users').send(users[2]);

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
    });
    it('Should return all users', async () => {
      const response = await request(server).get('/api/users');
      expect(response.body.length).toEqual(3);
    });
    it('Should create new user', async () => {
      const res = await request(server).post('/api/users').send(users[0]);

      expect(res.statusCode).toBe(201);
      expect(res.body.username).toBe('Max');
      expect(res.body.age).toBe(17);
      expect(res.body.hobbies).toEqual(['swimming', 'reading']);

      id4 = res.body.id;
      users[3] = res.body;
    });
    it('Should return new count of users', async () => {
      const response = await request(server).get('/api/users');
      expect(response.body.length).toEqual(4);
    });

    it('Should delete users', async () => {
      const res1 = await request(server).delete(`/api/users/${id1}`);
      const res2 = await request(server).delete(`/api/users/${id2}`);
      const res3 = await request(server).delete(`/api/users/${id3}`);
      const res4 = await request(server).delete(`/api/users/${id4}`);
      const response = await request(server).get('/api/users');
      expect(response.body).toEqual([]);
    });
    server.close();
  });

  describe('Scenario 3 with error handlings', () => {
    let invalidUser = {
      username: 'Nik',
      age: 17,
    };
    let user = {
      username: 'Nik',
      age: 17,
      hobbies: ['boxing', 'running'],
    };
    it('Request on non existing endpoint should return message: Page not found', async () => {
      const response = await request(server).get(`/api/`);
      expect(response.body.message).toEqual(`Page not found`);
      expect(response.statusCode).toEqual(404);
    });
    it("Request with non existing id should return message: User doesn't exist ", async () => {
      const response = await request(server).get(
        `/api/users/1c4538d4-22d7-47d6-b23f-d2c99fd3c96f`
      );
      expect(response.body.message).toEqual(`User doesn\'t exist`);
      expect(response.statusCode).toEqual(404);
    });
    it('Request with invalid uuid id should return message: UserId is invalid ', async () => {
      const response = await request(server).get(
        `/api/users/1c4538d4-22d7-47d6`
      );
      expect(response.body.message).toEqual(`UserId is invalid`);
      expect(response.statusCode).toEqual(400);
    });
    it("POST request without required field should return message: Request body doesn't contain required fields ", async () => {
      const response = await request(server)
        .post(`/api/users`)
        .send(invalidUser);
      expect(response.body.message).toEqual(
        `Request body doesn't contain required fields`
      );
      expect(response.statusCode).toEqual(400);
    });

    it("PUT request without required field should return message: Request body doesn't contain required fields ", async () => {
      const res = await request(server).post('/api/users').send(user);
      const response = await request(server)
        .put(`/api/users/${res.body.id}`)
        .send(invalidUser);
      expect(response.body.message).toEqual(
        `Request body doesn't contain required fields`
      );
      expect(response.statusCode).toEqual(400);
    });
    it('PUT request with invalid uuid id should return message: UserId is invalid ', async () => {
      const response = await request(server)
        .put(`/api/users/awdawdawdawdadw`)
        .send(invalidUser);
      expect(response.body.message).toEqual(`UserId is invalid`);
      expect(response.statusCode).toEqual(400);
    });

    server.close();
  });
});
