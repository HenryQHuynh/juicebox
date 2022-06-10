const express = require('express');
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts right now!");

  next(); // THIS IS DIFFERENT
});

postsRouter.get('/', (req, res) => {
  res.send({
    posts: []
  });
});

module.exports = postsRouter;