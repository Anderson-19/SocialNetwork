const { Router } = require("express");
const { check } = require("express-validator");

const { validateField, validateJWT } = require("../middlewares/index");
const { existsPostID, existsUserID } = require("../helpers/index");
const { forwarded, getForwardedPostId, removeForwareded, getForwardedUserId } = require("../controllers/post-forwarded");

const router = Router();

router.post('/addForwarded/:postId/:userForwardedId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    check('userForwardedId', 'Invalid ID').isUUID(),
    check('userForwardedId').custom(existsUserID),
    validateField
], forwarded);

router.get('/getForwardedByUserId/:userId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    validateField
], getForwardedUserId);

router.get('/getForwardedByPostId/:postId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    validateField
], getForwardedPostId);

router.delete('/deleteForwarded/:postId/:postForwardedId', [
    validateJWT,
    check('postId', 'Invalid ID').isUUID(),
    check('postId').custom(existsPostID),
    check('postForwardedId', 'Invalid ID').isUUID(),
    validateField
], removeForwareded);

module.exports = router;
