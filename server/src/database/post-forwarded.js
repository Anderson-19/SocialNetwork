const dataBase = require("./dataBase");

const db = new dataBase();

const addForwarded = async (forwardedId, postId, userId, userForwardedId) => {
    const query = 'INSERT INTO post_forwarded (forwarded_id,date,post_id,user_id,user_forwarded_id) VALUES ($1,NOW(),$2,$3,$4)';
    return await db.pool.query(query, [forwardedId, postId, userId, userForwardedId]);
}

const getForwardedByUserId = async (userId) => {
    const query = `
            SELECT forwarded_id, date, user_forwarded_id, pf.post_id, content, img, u.user_id, name, lastname, username, email, avatar FROM post_forwarded AS pf 
            INNER JOIN posts AS p ON p.post_id=pf.post_id 
            INNER JOIN users AS u ON u.user_id=pf.user_forwarded_id 
            WHERE pf.user_id=$1
        `;
    return (await db.pool.query(query, [userId])).rows;
}

const getForwardedByPostId = async (postId) => {
    const query = `
            SELECT pf.forwarded_id, pf.date, pf.user_id AS pf_uid, pf.user_forwarded_id, p.post_id, p.content, p.img, p.created_at, p.user_id FROM post_forwarded AS pf 
            INNER JOIN posts AS p ON p.post_id=pf.post_id 
            WHERE p.post_id=$1
        `;
    return (await db.pool.query(query, [postId])).rows;
}

const deleteForwarded = async (postForwardedId) => {
    const query = 'DELETE FROM post_forwarded WHERE forwarded_id=$1';
    return await db.pool.query(query, [postForwardedId]);
}

const updateForwardedOfPost = async ({ forwarded, post_id }) => {
    const query = 'UPDATE posts SET forwarded=$1 WHERE post_id=$2';
    return await db.pool.query(query, [forwarded, post_id]);
}

module.exports = { addForwarded, getForwardedByUserId, getForwardedByPostId, deleteForwarded, /* updateForwardedOfPost */ }