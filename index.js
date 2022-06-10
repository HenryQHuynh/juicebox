// npm run start:dev
// npm run start
// node index.js into this file and curl to have things display
// curl http://localhost:3000

const PORT = 3000;
const express = require('express');
const server = express();
// const app = express();

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");

    next();
});

// app.use('/api', (req, res, next) => {
//   console.log("A request was made to /api");
//   next();
// });

// app.get('/api', (req, res, next) => {
//   console.log("A get request was made to /api");
//   res.send({ message: "success" });
// });

server.listen(PORT, () => {
    console.log('The server is up on port', PORT, '. Systems operational')
});

