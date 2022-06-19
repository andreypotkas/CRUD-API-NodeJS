import server from '../app.js';
import request from 'supertest';

describe('Testing CRUD API', () => {
  describe('Scenario 1', () => {
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
  });
});
