const { Router } = require("express");
const { check } = require("express-validator");

const { validateField,  validateJWT } = require("../middlewares/index");
const { existsPostID, existsUserID } = require("../helpers/index");
const { createPost, deletePostId, getAllPosts, getPostId, getPostsId, getPostsOfFollowingsId } = require("../controllers/post");

const router = Router();

router.post('/create', validateJWT, createPost);

router.get('/getAll', validateJWT, getAllPosts);

router.get('/getPostsByUserId/:userId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    validateField
], getPostsId);

router.get('/getPostByPostId/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], getPostId);

router.get('/getPostsOfFollowings', validateJWT, getPostsOfFollowingsId);

router.delete('/delete/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], deletePostId);

module.exports = router;
