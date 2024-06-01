const { request, response } = require('express');
const { getUserByName } = require('../database');

const searchUser = async (req = request, res = response) => {
    const { finished } = req.params;

    const user = await getUserByName(finished);

    if (!user) return res.status(401).json({ ok: false });

    res.status(200).json(user);

}

module.exports = searchUser;


