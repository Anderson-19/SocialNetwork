const { request, response } = require('express');
const { v4 } = require('uuid');

const { verifyJWT } = require('../helpers');
const { addBookmark, deleteBookmark, getBookmarksByPostId, getBookmarksByUserId, getPostById } = require('../database');

const createBookmark = async (req = request, res = response) => {
    const { postId, userBookmarkId } = req.params;
    const { x_token } = req.headers;
    const id = v4();

    try {

        const { uid } = await verifyJWT(x_token?.toString());

        await addBookmark(id, postId, uid, userBookmarkId);

        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(400).json({ error });
    }

}

const getBookmarksUserId = async (req = request, res = response) => {
    const { userId } = req.params;

    try {
        const bookmarks = await getBookmarksByUserId(userId);

        res.status(200).json({ bookmarks });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const getBookmarksPostId = async (req = request, res = response) => {
    const { postId } = req.params;

    try {
        const bookmarks = await getBookmarksByPostId(postId);

        res.status(200).json({ bookmarks });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const removeBookmark = async (req = request, res = response) => {
    const { postId, postBookmarkId } = req.params;

    try {
        await deleteBookmark(postBookmarkId);
        res.status(200).json({ ok: true });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = { createBookmark, deleteBookmark, getBookmarksPostId, getBookmarksUserId, removeBookmark }