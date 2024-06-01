const { Router } = require("express");
const { check } = require("express-validator");

const { validateField, validateJWT } = require("../middlewares/index");
const { existsPostID, existsUserID } = require("../helpers/index");
const { deleteLike, getLikesPostId, getLikesUserId, like } = require("../controllers/post-likes");

const router = Router();

router.post('/addLike/:postId/:userLikeId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    check('userLikeId', 'Invalid ID').isUUID(),
    check('userLikeId').custom(existsUserID),
    validateField
], like);

router.get('/getLikesByUserId/:userId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    validateField
], getLikesUserId);

router.get('/getLikesByPostId/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], getLikesPostId);

router.delete('/disLike/:postId/:postLikeId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    check('postLikeId', 'Invalid ID').isUUID(),
    validateField
], deleteLike);

module.exports = router;
