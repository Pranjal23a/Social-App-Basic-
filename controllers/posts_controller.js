const Post = require("../models/post");
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post
        },
        message: "Post Created!"
      });
    }
    req.flash('success', 'Post Published!');
    return res.redirect('back');
  } catch (err) {
    req.flash('error', err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {

      await Like.deleteMany({ likeable: post, onModel: 'Post' });
      await Like.deleteOne({ _id: { $in: post.comment } });

      post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id
          },
          message: "Post Deleted!"
        })
      }
      req.flash('success', 'Post and Associated comments deleted!');
      return res.redirect('back');
    } else {
      req.flash('error', 'You can not delete this post')
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', err);
    return;
  }
};
