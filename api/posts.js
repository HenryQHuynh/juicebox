const express = require('express');
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  res.send({ message: 'hello from /posts! We will try something new! But not really' });
});

module.exports = postsRouter;