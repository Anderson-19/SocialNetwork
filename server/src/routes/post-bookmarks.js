const { Router } = require("express");
const { check } = require("express-validator");

const { validateField, validateJWT } = require("../middlewares/index");
const { existsPostID, existsUserID } = require("../helpers/index");
const { createBookmark, getBookmarksPostId, getBookmarksUserId, removeBookmark } = require("../controllers/post-bookmarks");

const router = Router();

router.post('/addBookmark/:postId/:userBookmarkId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    check('userBookmarkId', 'Invalid ID').isUUID(),
    check('userBookmarkId').custom(existsUserID),
    validateField
], createBookmark);

router.get('/getBookmarksByUserId/:userId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    validateField
], getBookmarksUserId);

router.get('/getBookmarksByPostId/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], getBookmarksPostId);

router.delete('/deleteBookmark/:postId/:postBookmarkId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    check('postBookmarkId', 'Invalid ID').isUUID(),
    validateField
], removeBookmark);

module.exports = router;
