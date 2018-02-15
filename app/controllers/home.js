const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Post.find().populate('author').populate('category').exec(function (err, posts) {
    if (err) return next(err);
    res.render('blog/index.jade', {
      title: 'Node Blog Home',
      posts: posts
    });
  });
});

router.get('/about', (req, res, next) => {
  res.render('blog/index.jade', {
    title: 'Node Blog About',
  });
});

router.get('/contact', (req, res, next) => {
  res.render('blog/index.jade', {
    title: 'Node Blog Contact',
  });
});
