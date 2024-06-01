const dataBase = require("./dataBase");

const db = new dataBase();

const setComment = async (post_comment_id, post_id, user_id) => {
    const query = 'INSERT INTO post_comments (post_comment_id,post_id,user_id,created_at) VALUES ($1,$2,$3,NOW())';
    return await db.pool.query(query, [post_comment_id, post_id, user_id]);
}

const getCommets = async () => {
    const query = 'SELECT * FROM post_comments AS pc INNER JOIN users ON pc.user_id=users.user_id ORDER BY pc.created_at DESC';
    return (await db.pool.query(query)).rows;
}

const getCommentsByPostId = async (postId) => {
    const query = `
            SELECT post_comment_id, pc.post_id, p.content, p.img, pc.user_id, p.created_at, name, lastname, username, email, avatar FROM post_comments AS pc
            INNER JOIN posts AS p ON p.post_id=pc.post_comment_id 
            INNER JOIN users AS u ON u.user_id=pc.user_id
            WHERE pc.post_id=$1
        `;
    return (await db.pool.query(query, [postId])).rows;
}

const deleteComment = async (postCommentId) => {
    const query = 'DELETE FROM post_comments WHERE post_comment_id=$1';
    return await db.pool.query(query, [postCommentId]);
}

module.exports = { setComment, getCommets, getCommentsByPostId, deleteComment }
