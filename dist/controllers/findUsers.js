import users from '../db/users.js';
export function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}
export function findUserById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        resolve(user);
    });
}
