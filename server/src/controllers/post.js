const { response, request } = require('express');
const { UploadedFile } = require("express-fileupload");
const { v4 } = require('uuid');

const { setPost, getPosts, getPostsById, getPostById, getPostsOfFollowingsById, getLikesByPostId, getForwardedByPostId, getBookmarksByPostId, getCommentsPostId, deleteComments, disLike, deleteForwarded, deleteBookmark, deletePost  } = require("../database");
const { deleteFile, uploadFile, verifyJWT } = require('../helpers');


const createPost = async (req = request, res = response) => {
    const { x_token } = req.headers;
    const { content } = req.body;
    const post_id = v4();

    try {
        const { uid } = await verifyJWT(x_token?.toString());

        if (content && req.files?.file) {
            const { tempFilePath } = req.files?.file;
            const file = await uploadFile(tempFilePath, 'posts');
            await setPost(post_id, content, file, uid);
            res.status(201).json({ ok: true });
        } else if (content) {
            await setPost(post_id, content, '', uid);
            res.status(201).json({ ok: true });
        } else {
            const { tempFilePath } = req.files?.file;
            const file = await uploadFile(tempFilePath, 'posts');
            await setPost(post_id, '', file, uid);
            res.status(201).json({ ok: true });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getAllPosts = async (req = request, res = response) => {

    try {
        const posts = await getPosts();
        res.status(201).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getPostsId = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const posts = await getPostsById(userId);
        res.status(201).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getPostId = async (req = request, res = response) => {
    const { postId } = req.params;

    try {
        const post = await getPostById(postId);
        res.status(201).json({ post: post.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const getPostsOfFollowingsId = async (req = request, res = response) => {
    const { x_token } = req.headers;

    try {
        const { uid } = await verifyJWT(x_token?.toString());

        const posts = await getPostsOfFollowingsById(uid);
        res.status(201).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const deletePostId = async (req = request, res = response) => {
    const { postId } = req.params;

    try {
        const post = await getPostById(postId);
        if (post.rows[0].post_id !== postId) return res.status(500).json({ ok: false });

        const postLikes = await getLikesByPostId(postId);
        const postForwarded = await getForwardedByPostId(postId)
        const postBookmarks = await getBookmarksByPostId(postId);

        const commentsPost = await getCommentsPostId(postId);
        if (commentsPost.rowCount < 1) {

            if (post.rows[0].img) {
                const img = post.rows[0].img.split('/')[9].split('.')[0];
                await deleteFile(img, 'posts');

                await deleteComments(postId);
                await disLike(postLikes[0]?.post_like_id);
                await deleteForwarded(postForwarded[0]?.forwarded_id);
                await deleteBookmark(postBookmarks[0]?.post_bookmark_id);
                await deletePost(postId);
                res.status(201).json({ ok: true });
            } else {

                await deleteComments(postId);
                await disLike(postLikes[0]?.post_like_id);
                await deleteForwarded(postForwarded[0]?.forwarded_id);
                await deleteBookmark(postBookmarks[0]?.post_bookmark_id);
                await deletePost(postId);
                res.status(201).json({ ok: true });
            }

        } else {
            commentsPost.rows.map(async (post_comment_id) => {

                if (post.rows[0].img) {
                    const img = post.rows[0].img.split('/')[9].split('.')[0];

                    Promise.all([
                        await deleteFile(img, 'posts'),
                        await deleteComments(post_comment_id),
                        await disLike(post_comment_id),
                        await deleteForwarded(post_comment_id),
                        await deletePost(post_comment_id),

                        await deleteComments(postId),
                        await disLike(postLikes[0]?.post_like_id),
                        await deleteForwarded(postForwarded[0]?.forwarded_id),
                        await deleteBookmark(postBookmarks[0]?.post_bookmark_id),
                        await deletePost(postId),
                    ]);

                } else {

                    Promise.all([
                        await deleteComments(post_comment_id),
                        await disLike(post_comment_id),
                        await deleteForwarded(post_comment_id),
                        await deletePost(post_comment_id),

                        await deleteComments(postId),
                        await disLike(postLikes[0]?.post_like_id),
                        await deleteForwarded(postForwarded[0]?.forwarded_id),
                        await deleteBookmark(postBookmarks[0]?.post_bookmark_id),
                        await deletePost(postId),
                    ]);

                }
            })
            res.status(201).json({ ok: true });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

module.exports = { createPost, getAllPosts, getPostId, getPostsId,getPostsOfFollowingsId, deletePostId }