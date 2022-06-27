# CRUD-API-NODEJS

:alien::pencil: Simple CRUD API implemented using Node.js APIs without frameworks with using typescript.

## Description

- First you need to install dependencies:

```bash
    npm install
```

- The program is started by npm-script start in following way:

```bash
   npm run start:dev - application is run in development mode
   npm run start:prod - application is run in production mode
   npm run start:multi - starts multiple instances of application using the Node.js Cluster API
   npm run test - run tests
```

## Endpoints:

- GET api/users is used to get all users:
- GET api/users/${userId}
- POST api/users is used to create record about new user and store it in database
- PUT api/users/{userId} is used to update existing user
- DELETE api/users/${userId} is used to delete existing user from database
