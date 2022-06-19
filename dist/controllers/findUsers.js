import users from '../db/users.js';
export function findAllUsers() {
    return new Promise(function (resolve, reject) {
        resolve(users);
    });
}
export function findUserById(id) {
    return new Promise(function (resolve, reject) {
        var user = users.find(function (user) { return user.id === id; });
        resolve(user);
    });
}
