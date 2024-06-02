const { Router } = require('express');
const { check } = require('express-validator');

const { existsUserID } = require('../helpers/index');

const { validateField } = require('../middlewares/index');
const { getMessages, sendMessage } = require('../controllers/index');

const router = Router();

router.get("/:senderId/:receiverId", [
    check('senderId', 'Invalid ID').isUUID(),
    check('senderId').custom(existsUserID),
    check('receiverId', 'Invalid ID').isUUID(),
    check('receiverId').custom(existsUserID),
    validateField
], getMessages);

router.post("/send/:senderId/:receiverId", [
    check('senderId', 'Invalid ID').isUUID(),
    check('senderId').custom(existsUserID),
    check('receiverId', 'Invalid ID').isUUID(),
    check('receiverId').custom(existsUserID),
    validateField
], sendMessage);

module.exports = router;



