const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = (app) => {
  app.use('/posts', router);
};

router.get('/', (req, res, next) => {
  Post.find({ published: true })
    .populate('author')
    .populate('category')
    .exec( (err, posts) => {
      if (err) return next(err);
      res.render('blog/index.jade', {
        posts: posts
      });
    });
});

router.get('/view', (req, res, next) => {
});

router.get('/comment', (req, res, next) => {
});

router.get('/favourite', (req, res, next) => {
});
