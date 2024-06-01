const { getDataUser  } = require('../database/index');
const { getPostById } = require('../database/post');

const existsUserID = async (userId) => {
    const existsID = await getDataUser("", userId);
    if (existsID.rowCount < 1) {
        throw new Error(`This user: ${userId} not exists`);
    }
}

const existsPostID = async (postId) => {
    const existsID = await getPostById(postId);
    if (existsID.rowCount < 1) {
        throw new Error(`This post: ${postId} not exists`);
    }
}

module.exports = { existsPostID, existsUserID }

