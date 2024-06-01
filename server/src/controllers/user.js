const { request, response } = require('express');
const { v4 } = require('uuid');

const { getDataUser, getUsers, insertEditUser, follow, unFollow, getfollowers, getfollowings, setAvatarBannerUser } = require("../database");
const { uploadFile, destroyFile } = require('../helpers');

const getUser = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const getData = await getDataUser("", userId);
        const user = getData.rows[0];
        res.status(200).json({
            ok: true,
            uid: user?.user_id,
            name: user?.name,
            lastname: user?.lastname,
            username: user?.username,
            email: user?.email,
            created_at: user?.created_at,
            avatar: user?.avatar,
            location: user?.location,
            birthdate: user?.birthdate,
            biography: user?.biography,
            banner: user?.banner,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getAllUsers = async (req = request, res = response) => {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const editUser = async (req = request, res = response) => {
    const { userId } = req.params;
    const { name, lastname, location, birthdate, biography } = req.body;

    try {
        await insertEditUser( userId, name, lastname, location, birthdate, biography );
        res.status(201).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false });
    }
}

const followUser = async (req = request, res = response) => {
    const { followingId } = req.params;
    const { followerId } = req.body;
    const followId = v4();

    try {
        if (followerId === followingId) return res.status(404).json({ ok: false, msg: "You can't follow yourself" });
        await follow(followId, followerId, followingId);
        res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const unFollowUser = async (req = request, res = response) => {
    const { followingId, userId } = req.params;

    try {
        await unFollow(followingId, userId);

        res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }

}

const getFollowerAndFollowings = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const followers = await getfollowers(userId);
        const followings = await getfollowings(userId);
        res.status(200).json({ ok: true, followers: followers.rows, followings: followings.rows });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }

}

const changeAvatarUser = async (req = request, res = response) => {
    const { userId, imgUrl } = req.params;
    const { tempFilePath } = req.files?.avatar;

    try {
        const getData = await getDataUser("", userId);
        const avatar = getData.rows[0]?.avatar.split('/')[9];
        if (avatar === imgUrl) {
            await destroyFile(imgUrl.split('.')[0], 'users');
            const file = await uploadFile(tempFilePath, 'users');
            await setAvatarBannerUser(userId, file, '');
            res.status(201).json({ ok: true, avatar: file });
        } else {
            const file = await uploadFile(tempFilePath, 'users');
            await setAvatarBannerUser(userId, file, '');
            res.status(201).json({ ok: true, avatar: file });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false });
    }
}

const changeBannerUser = async (req = request, res = response) => {
    const { userId, imgUrl } = req.params;
    const { tempFilePath } = req.files?.banner;

    try {
        const getData = await getDataUser("", userId);
        const banner = getData.rows[0]?.banner.split('/')[9];
        if (banner === imgUrl) {
            await destroyFile(imgUrl.split('.')[0], 'users');
            const file = await uploadFile(tempFilePath, 'users');
            await setAvatarBannerUser(userId, '', file);
            res.status(201).json({ ok: true, banner: file });
        } else {
            const file = await uploadFile(tempFilePath, 'users');
            await setAvatarBannerUser(userId, '', file);
            res.status(201).json({ ok: true, banner: file });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ ok: false });
    }
}

module.exports = {  changeAvatarUser, changeBannerUser, getUser, getAllUsers, editUser, followUser, unFollowUser, getFollowerAndFollowings }