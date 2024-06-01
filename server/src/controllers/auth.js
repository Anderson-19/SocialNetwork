const { request, response } = require('express');
const bcrypt = require("bcryptjs");
const { v4 } = require('uuid');

const { generateJWT } = require('../helpers');
const { userConnected, getDataUser, setDataUser } = require('../database');

const register = async (req = request, res = response) => {
    const {
        email,
        password,
        name,
        lastname,
        avatar = 'https://res.cloudinary.com/dav7kqayl/image/upload/v1703882215/social-network/default-users/wsbtqrhs3537j8v2ptlg.png',
        banner = 'https://res.cloudinary.com/dav7kqayl/image/upload/v1703882221/social-network/default-users/x1hms9adlkxsdtjjkzrc.jpg',
        username } = req.body;

    const uid = v4();
    try {
        const getData = await getDataUser(email);
        if (getData.rowCount > 0) {
            return res.status(400).json({
                ok: false,
                message: `El usuario ${email} ya existe`
            });
        }

        const pass = bcrypt.hashSync(password, bcrypt.genSaltSync());
        await setDataUser(uid, name, lastname, username, email, pass, avatar, banner);

        res.status(201).json({
            ok: true,
            name,
            email
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el administrador',
        });
    }
}

const logIn = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const getData = await getDataUser(email);

        if (getData.rowCount < 1) {
            return res.status(400).json({
                ok: false,
                message: `El usuario ${email} no existe`
            });
        }

        const validPassword = bcrypt.compareSync(password, getData.rows[0]?.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password incorrecto'
            });
        }

        const token = await generateJWT({ uid: getData.rows[0]?.user_id }, '4h');

        await userConnected(true, email);

        res.status(200).json({
            ok: true,
            uid: getData.rows[0]?.user_id,
            name: getData.rows[0]?.name,
            lastname: getData.rows[0]?.lastname,
            username: getData.rows[0]?.username,
            email: getData.rows[0]?.email,
            created_at: getData.rows[0]?.created_at,
            avatar: getData.rows[0]?.avatar,
            banner: getData.rows[0]?.banner,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }

}

const logout = async (req = request, res = response) => {
    const { email } = req.body;

    try {
        await userConnected(false, email);

        res.json({
            ok: true,
            message: 'Sesión cerrada'
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            message: 'Problema al cerrar la sesión'
        })
    }
}

module.exports = { register, logIn, logout }


