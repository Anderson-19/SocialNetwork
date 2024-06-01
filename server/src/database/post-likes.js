const dataBase = require("./dataBase");

const db = new dataBase();

const addLike = async (post_like_id, postId, userId, userLikeId) => {
    const query = 'INSERT INTO post_likes (post_like_id,date,post_id,user_id,user_like_id) VALUES ($1,NOW(),$2,$3,$4)';
    return await db.pool.query(query, [post_like_id, postId, userId, userLikeId]);
}

const getLikesByUserId = async (userId) => {
    const query = `
            SELECT post_like_id, date, user_like_id, pl.post_id, content, img, u.user_id, pl.user_id AS pl_id, name, lastname, username, email, avatar FROM post_likes AS pl 
            INNER JOIN posts AS p ON p.post_id=pl.post_id 
            INNER JOIN users AS u ON u.user_id=pl.user_like_id 
            WHERE pl.user_id=$1
        `;
    return (await db.pool.query(query, [userId])).rows;
}

const getLikesByPostId = async (postId) => {
    const query = `
            SELECT pl.post_like_id, pl.date, pl.user_id AS pl_uid, pl.user_like_id, p.post_id, p.content, p.img, p.created_at, p.user_id FROM post_likes AS pl 
            INNER JOIN posts AS p ON p.post_id=pl.post_id
            WHERE p.post_id=$1
        `;
    return (await db.pool.query(query, [postId])).rows;
}

const disLike = async (postLikeId) => {
    const query = 'DELETE FROM post_likes WHERE post_like_id=$1';
    return await db.pool.query(query, [postLikeId]);
}

const updateLikeOfPost = async (likes, post_id) => {
    const query = 'UPDATE posts SET likes=$1 WHERE post_id=$2';
    return await db.pool.query(query, [likes, post_id]);
}
module.exports = { addLike, getLikesByUserId, getLikesByPostId, disLike, /* updateLikeOfPost */ }






