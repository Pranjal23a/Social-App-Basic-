const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find().sort('-createdAt').populate('user').populate({ path: 'comment', populate: { path: 'user' }, populate: { path: 'likes' } }).populate('likes');
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log("Error!!", err);
        return;
    }
};
