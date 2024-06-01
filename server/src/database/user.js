const dataBase = require("./dataBase");

const db = new dataBase();

const getDataUser = async (email, uid) => {
    let query = '';

    if (email) {
        query = 'SELECT * FROM users WHERE email=$1';
        return await db.pool.query(query, [email]);
    } else {
        query = 'SELECT * FROM users WHERE user_id=$1';
        return await db.pool.query(query, [uid]);
    }

}

const getUserByName = async (name) => {
    let query = 'SELECT * FROM users WHERE name=$1';
    return await db.pool.query(query, [name]);
}

const setDataUser = async (uid, name, lastname, username, email, password, avatar, banner) => {
    const query = 'INSERT INTO users (user_id,name,lastname,username,email,password,avatar,created_at,banner,connected) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),$8,$9)';
    return await db.pool.query(query, [uid, name, lastname, username, email, password, avatar, banner, false]);
}

const insertEditUser = async (uid, name, lastname, biography, location, birthdate) => {
    const query = 'UPDATE users SET name=$1, lastname=$2, biography=$3, location=$4, birthdate=$5 WHERE user_id=$6';
    return await db.pool.query(query, [name, lastname, biography, location, birthdate, uid]);
}

const userConnected = async (connected, email) => {
    const query = 'UPDATE users SET connected=$1 WHERE email=$2';
    return await db.pool.query(query, [connected, email]);
}

const setAvatarBannerUser = async (uid, avatar, banner) => {
    if (avatar) {
        const query = 'UPDATE users SET avatar=$1 WHERE user_id=$2';
        return await db.pool.query(query, [avatar, uid]);
    } else {
        const query = 'UPDATE users SET banner=$1 WHERE user_id=$2';
        return await db.pool.query(query, [banner, uid]);
    }
}

const getUsers = async () => {
    const query = 'SELECT * FROM users';
    return (await db.pool.query(query)).rows;
}

const follow = async (followId, followerId, followingId) => {
    const query = 'INSERT INTO follows (follow_id,date,follower_id,following_id) VALUES ($1,NOW(),$2,$3)';
    return await db.pool.query(query, [followId, followerId, followingId]);
}

const getfollowers = async (followingId) => {
    const query = `
            SELECT f.follow_id, f.follower_id, f.following_id, u.user_id, u.name, u.lastname, u.username, u.email, u.avatar, u.biography, u.location, u.connected FROM follows AS f
            INNER JOIN users AS u ON u.user_id=f.follower_id
            WHERE f.following_id=$1
        `;
    return await db.pool.query(query, [followingId]);
}

const getfollowings = async (followerId) => {
    const query = `
            SELECT f.follow_id, f.following_id, f.follower_id, u.user_id, u.name, u.lastname, u.username, u.email, u.avatar, u.biography, u.location, u.connected FROM follows AS f
            INNER JOIN users AS u ON u.user_id=f.following_id
            WHERE f.follower_id=$1
        `;
    return await db.pool.query(query, [followerId]);
}

const unFollow = async (followingId, userId) => {
    const query = 'DELETE FROM follows WHERE following_id=$1 AND follower_id=$2';
    return await db.pool.query(query, [followingId, userId]);
}


module.exports = { getDataUser, getUserByName, setDataUser, insertEditUser, userConnected, setAvatarBannerUser, getUsers, follow, getfollowers, getfollowings, unFollow }

