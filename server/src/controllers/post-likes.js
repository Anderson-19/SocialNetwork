const { Request, Response } = require('express');
const { v4 } = require('uuid');

const { verifyJWT } = require('../helpers');
const { addLike, disLike, getLikesByPostId, getLikesByUserId, getPostById } = require('../database/index');

const like = async (req = request, res = response) => {
    const { postId, userLikeId } = req.params;
    const { x_token } = req.headers;
    const id = v4();

    try {

        const { uid } = await verifyJWT(x_token?.toString());

        await addLike(id, postId, uid, userLikeId);

        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(400).json({ error });
    }

}

const getLikesUserId = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const likes = await getLikesByUserId(userId);

        res.status(200).json({ likes });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const getLikesPostId = async (req = request, res = response) => {
    const { postId } = req.params;

    
    try {
        const likes = await getLikesByPostId(postId);

        res.status(200).json({ likes });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const deleteLike = async (req = request, res = response) => {
    const { postId, postLikeId } = req.params;

    try {
        await disLike(postLikeId);
        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = { like, getLikesPostId, getLikesUserId, deleteLike }