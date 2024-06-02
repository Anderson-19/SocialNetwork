const { getDataUser, getUserByName, setDataUser, insertEditUser, userConnected, setAvatarBannerUser, getUsers, follow, getfollowers, getfollowings, unFollow } = require('./user');
const { setPost, getPosts, getPostsById, getPostsOfFollowingsById, getPostById, deletePost, getCommentsPostId, deleteComments } = require('./post');
const { addForwarded, getForwardedByUserId, getForwardedByPostId, deleteForwarded } = require('./post-forwarded');
const { addLike, getLikesByUserId, getLikesByPostId, disLike } = require('./post-likes');
const { setComment, getCommets, getCommentsByPostId, deleteComment } = require('./post-comments');
const { addBookmark, getBookmarksByUserId, getBookmarksByPostId, deleteBookmark } = require('./post-bookmarks');
const { createConversation, addMessageToConversation, getConversation, getConversations, createMessage, getMessageId, getMessagesIds } = require('./chat');

module.exports = {
    getDataUser, 
    getUserByName, 
    setDataUser, 
    insertEditUser, 
    userConnected, 
    setAvatarBannerUser, 
    getUsers, 
    follow, 
    getfollowers, 
    getfollowings, 
    unFollow,
    setPost, 
    getPosts, 
    getPostsById, 
    getPostsOfFollowingsById, 
    getPostById, 
    deletePost, 
    getCommentsPostId, 
    deleteComments,
    addForwarded, 
    getForwardedByUserId, 
    getForwardedByPostId, 
    deleteForwarded,
    addLike, 
    getLikesByUserId, 
    getLikesByPostId, 
    disLike,
    setComment, 
    getCommets, 
    getCommentsByPostId, 
    deleteComment,
    addBookmark, 
    getBookmarksByUserId, 
    getBookmarksByPostId, 
    deleteBookmark,
    createConversation, 
    addMessageToConversation, 
    getConversation, 
    getConversations, 
    createMessage, 
    getMessageId, 
    getMessagesIds
 }
