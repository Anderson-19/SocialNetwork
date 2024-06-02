const auth = require('./auth');
const user = require('./user');
const post = require('./post');
const postForwarded = require('./post-forwarded');
const postLikes = require('./post-likes');
const postComments = require('./post-comments');
const postBookmarks = require('./post-bookmarks');
const chat = require('./chat');

module.exports = { auth, user, post, postBookmarks, postComments, postForwarded, postLikes, chat };