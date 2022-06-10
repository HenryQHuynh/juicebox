require('dotenv').config();

// npm run start:dev -- Runs nodemon
// npm run start -- Runs DB once
// node index.js into this file and curl to have things display
// curl http://localhost:3000

// As we're resting our webtoken. enter the below text into the command line
// curl http://localhost:3000/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "albert", "password": "bertie99"}'
// curl http://localhost:3000/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "sandral", "password": "2sandy4me"}' 
// curl http://localhost:3000/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "glamgal", "password": "soglam"}' 


const PORT = 3000;
const express = require('express');
const server = express();
// const app = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log('The server is up on port', PORT, '. Systems operational')
});

const apiRouter = require('./api');
server.use('/api', apiRouter);


// Previous Practice
// server.use((req, res, next) => {
//     console.log("<____Body Logger START____>");
//     console.log(req.body);
//     console.log("<_____Body Logger END_____>");

//     next();
// });

// app.use('/api', (req, res, next) => {
//   console.log("A request was made to /api");
//   next();
// });

// app.get('/api', (req, res, next) => {
//   console.log("A get request was made to /api");
//   res.send({ message: "success" });
// });