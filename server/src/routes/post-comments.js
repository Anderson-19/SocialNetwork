const { Router } = require("express");
const { check } = require("express-validator");

const { validateField, validateJWT } = require("../middlewares/index");
const { existsPostID } = require("../helpers/index");
const { createComment, removeComment, getComments, getCommentsPostId } = require("../controllers/post-comments");

const router = Router();

router.post('/create/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], createComment);

router.get('/getAll', validateJWT, getComments);

router.get('/getCommentsByPostId/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], getCommentsPostId);

router.delete('/delete/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], removeComment);

module.exports = router;
