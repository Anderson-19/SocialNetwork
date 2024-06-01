const { Router } = require('express');
const { check } = require('express-validator');

const { validateField, validateJWT, validateFile } = require('../middlewares/index');
const { existsUserID } = require('../helpers/index');
const { changeAvatarUser, changeBannerUser, editUser, followUser, getFollowerAndFollowings, getUser, getAllUsers, unFollowUser } = require('../controllers/user');

const router = Router();

router.get('/get/:userId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    validateField
], getUser);

router.get('/getAll', getAllUsers);

router.put('/edit/:userId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    validateField
], editUser);

router.put('/follow/:followingId', [
    validateJWT,
    check('followingId', 'Invalid ID').isUUID(),
    check('followingId').custom(existsUserID),
    validateField
], followUser);

router.get('/getFollow/:userId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    validateField
], getFollowerAndFollowings);

router.delete('/unFollow/:userId/:followingId', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    check('followingId', 'Invalid ID').isUUID(),
    check('followingId').custom(existsUserID),
    validateField
], unFollowUser);

router.post('/changeAvatar/:userId/:imgUrl', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    check('imgUrl').not().isEmpty(),
    validateFile
], changeAvatarUser);

router.post('/changeBanner/:userId/:imgUrl', [
    validateJWT,
    check('userId', 'Invalid ID').isUUID(),
    check('userId').custom(existsUserID),
    check('imgUrl').not().isEmpty(),
    validateFile
], changeBannerUser);

module.exports = router;
