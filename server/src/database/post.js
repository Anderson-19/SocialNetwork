const dataBase = require("./dataBase");

const db = new dataBase();

const setPost = async (post_id, content='', img='', user_id) => {
    const query = 'INSERT INTO posts (post_id,content,img,created_at,user_id) VALUES ($1,$2,$3,NOW(),$4)';
    return await db.pool.query(query, [post_id, content, img, user_id]);
}

const getPosts = async () => {
    const query = 'SELECT * FROM posts INNER JOIN users ON posts.user_id=users.user_id ORDER BY posts.created_at DESC';
    return (await db.pool.query(query)).rows;
}

const getPostsById = async (userId) => {
    const query = `
            SELECT DISTINCT name, lastname, username, email, avatar, u.created_at, u.user_id, content, img, p.post_id, p.created_at FROM posts AS p 
            INNER JOIN users AS u ON p.user_id=u.user_id 
            WHERE u.user_id=$1
        `;
    return (await db.pool.query(query, [userId])).rows;
}

const getPostsOfFollowingsById = async (userId) => {
    const query = `
            SELECT DISTINCT name, lastname, username, email, avatar, u.created_at, u.user_id, content, img, post_id, p.created_at, following_id FROM follows AS f
            INNER JOIN posts AS p ON p.user_id=f.following_id 
            INNER JOIN users AS u ON u.user_id=f.following_id
            WHERE f.following_id<>$1 AND p.user_id<>$2
        `;
    return (await db.pool.query(query, [userId, userId])).rows;
}

const getPostById = async (postId) => {
    const query = 'SELECT * FROM posts WHERE post_id=$1';
    return await db.pool.query(query, [postId]);
}

const deletePost = async (postId) => {
    const query = 'DELETE FROM posts WHERE post_id=$1';
    return await db.pool.query(query, [postId]);
}

const getCommentsPostId = async (postId) => {
    const query = 'SELECT post_comment_id FROM post_comments AS pc INNER JOIN posts AS p ON p.post_id=pc.post_comment_id WHERE pc.post_id=$1';
    return await db.pool.query(query, [postId]);
}

const deleteComments = async (postId) => {
    const query = 'DELETE FROM post_comments WHERE post_comment_id=$1';
    return await db.pool.query(query, [postId]);
}

module.exports = { setPost, getPosts, getPostsById, getPostsOfFollowingsById, getPostById, deletePost, getCommentsPostId, deleteComments }
