const { request, response } = require('express');
const { v4 } = require('uuid');

const { verifyJWT } = require("../helpers");
const { getPostById, addForwarded, getForwardedByUserId, getForwardedByPostId, deleteForwarded } = require("../database");

const forwarded = async (req = request, res = response) => {
    const { postId, userForwardedId } = req.params;
    const { x_token } = req.headers;
    const id = v4();

    try {

        const { uid } = await verifyJWT(x_token?.toString());

        await addForwarded(id, postId, uid, userForwardedId);

        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(400).json({ error });
    }

}

const getForwardedUserId = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const forwarded = await getForwardedByUserId(userId);

        res.status(200).json({ forwarded });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const getForwardedPostId = async (req = request, res = response) => {
    const { postId } = req.params;

    try {
        const forwarded = await getForwardedByPostId(postId);

        res.status(200).json({ forwarded });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const removeForwareded = async (req = request, res = response) => {
    const { postId, postForwardedId } = req.params;

    try {

        await deleteForwarded(postForwardedId);

        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = { forwarded, getForwardedPostId, removeForwareded, getForwardedUserId }


