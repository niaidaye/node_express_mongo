const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = (app) => {
  app.use('/posts', router);
};

router.get('/', (req, res, next) => {
  Post.find({ published: true })
    .sort('created')//给文章添加排序
    .populate('author')
    .populate('category')
    .exec( (err, posts) => {
      if (err) return next(err);

      var pageNum = Math.abs(parseInt(req.query.page, 10));//当前的页码
      var pageSize = 10;//页面显示10条

      var totalCount = posts.length;//文章总数
      var pageCount = Math.ceil(totalCount / pageSize);//页数

      if (pageNum > pageCount) {
        pageNum = pageCount;
      }

      res.render('blog/index.jade', {
        //slice(开始位置，结束位置)
        posts: posts.slice((pageNum - 1) * pageSize, pageNum * pageSize),
        pageNum: pageNum,
        pageCount: pageCount,
      });
    });
});

router.get('/view', (req, res, next) => {
});

router.get('/comment', (req, res, next) => {
});

router.get('/favourite', (req, res, next) => {
});
