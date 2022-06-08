// npm run start:dev
// npm run start

const PORT = 3000;
const express = require('express');
// const server = express();
const app = express();

// server.use((req, res, next) => {
//     console.log("<____Body Logger START____>");
//     console.log(req.body);
//     console.log("<_____Body Logger END_____>");

//     next();
// });

app.listen(PORT, () => {
    console.log('The server is up on port', PORT, '. Systems operational')
});



app.use((req, res, next) => {
    console.log("A request was made to /api Hello!");
    next();
  });
  
  app.get((req, res, next) => {
    console.log("A get request was made to /api");
    res.send({ message: "success" });
  });