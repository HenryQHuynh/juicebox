const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags right now!");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/', (req, res) => {
  res.send({
    tags: []
  });
});

module.exports = tagsRouter;