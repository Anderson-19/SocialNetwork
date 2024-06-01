const dataBase = require("./dataBase");

const db = new dataBase();

const addBookmark = async (post_bookmark_id, postId, userId, userBookmarkId) => {
    const query = 'INSERT INTO post_bookmarks (post_bookmark_id,post_id,user_id,user_bookmark_id,date) VALUES ($1,$2,$3,$4,NOW())';
    return await db.pool.query(query, [post_bookmark_id, postId, userId, userBookmarkId]);
}

const getBookmarksByUserId = async (userId) => {
    const query = `
            SELECT post_bookmark_id, date, user_bookmark_id, pb.post_id, content, img, u.user_id, pb.user_id AS pb_id, name, lastname, username, email, avatar FROM post_bookmarks AS pb 
            INNER JOIN posts AS p ON p.post_id=pb.post_id 
            INNER JOIN users AS u ON u.user_id=pb.user_bookmark_id 
            WHERE pb.user_id=$1
        `;
    return (await db.pool.query(query, [userId])).rows;
}

const getBookmarksByPostId = async (postId) => {
    const query = `
            SELECT pb.post_bookmark_id, pb.date, pb.user_id AS pb_uid, pb.user_bookmark_id, p.post_id, p.content, p.img, p.created_at, p.user_id FROM post_bookmarks AS pb
            INNER JOIN posts AS p ON p.post_id=pb.post_id
            WHERE p.post_id=$1
        `;
    return (await db.pool.query(query, [postId])).rows;
}

const deleteBookmark = async (postBookmarkId) => {
    const query = 'DELETE FROM post_bookmarks WHERE post_bookmark_id=$1';
    return await db.pool.query(query, [postBookmarkId]);
}

const updateBookmarkOfPost = async (bookmarks, post_id) => {
    const query = 'UPDATE posts SET bookmarks=$1 WHERE post_id=$2';
    return await db.pool.query(query, [bookmarks, post_id]);
}

module.exports = { addBookmark, getBookmarksByUserId, getBookmarksByPostId , deleteBookmark/* , updateBookmarkOfPost */ }







