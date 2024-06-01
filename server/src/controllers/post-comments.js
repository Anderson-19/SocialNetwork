const { response, request } = require('express');

const { v4 } = require('uuid');
const { deleteFile, uploadFile, verifyJWT } = require('../helpers');
const { deleteForwarded, deletePost, disLike, getCommentsByPostId, getCommets, getLikesByPostId, getPostById, setComment, setPost } = require('../database');


const createComment = async (req = request, res = response) => {
    const { x_token } = req.headers;
    const { postId } = req.params;
    const { content } = req.body;
    const id = v4();

    try {
        const { uid } = await verifyJWT(x_token?.toString());

        if (content && req.files?.file) {
            const { tempFilePath } = req.files?.file;
            const file = await uploadFile(tempFilePath, 'posts');

            await setPost(id, content, file, uid);
            await setComment(id, postId, uid);

            res.status(201).json({ ok: true });
        } else if (content) {
            await setPost(id, content, '',uid);
            await setComment(id, postId, uid);

            res.status(201).json({ ok: true });
        } else {
            const { tempFilePath } = req.files?.file;
            const file = await uploadFile(tempFilePath, 'posts');

            await setPost(id, '', file, uid);
            await setComment(id, postId, uid);

            res.status(201).json({ ok: true });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getComments = async (req = request, res = response) => {

    try {
        const comments = await getCommets();
        res.status(201).json({ comments });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getCommentsPostId = async (req = request, res = response) => {
    const { postId } = req.params;

    try {
        const comments = await getCommentsByPostId(postId);
        res.status(201).json({ comments });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const removeComment = async (req = request, res = response) => {
    const { postId } = req.params;

    try {
        const comments = await getPostById(postId);

        const postLikes = await getLikesByPostId(postId);

        if (comments.rows[0].img) {
            const img = comments.rows[0].img.split('/')[9].split('.')[0];
            await deleteFile(img, 'posts');

            await deleteComment(postId);
            await disLike(postLikes[0].user_like_id);
            await deleteForwarded(postId);
            await deletePost(postId);
            res.status(201).json({ ok: true })
        } else {
            await deleteComment(postId);
            await disLike(postLikes[0].user_like_id);
            await deleteForwarded(postId);
            await deletePost(postId);
            res.status(201).json({ ok: true })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

module.exports = { removeComment, getCommentsPostId, createComment, getComments }
