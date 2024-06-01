const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { getDataUser } = require('../database');

const validateJWT = async ( req = request, res = response, next ) => {

    const { x_token } = req.headers;

    if( !x_token ) return res.status(401).json({ msj: 'Token does not exist' });

    try {
        const { uid } = jwt.verify( x_token?.toString(), process.env.JWT_SECRET );
        
        const user = await getDataUser('', uid);
        const userAuth = user.rows[0];

        if ( !userAuth ) {
            return res.status(401).json({
                msj: `Invalid Token - user does not exist in DB`
            })
        }
       
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msj: 'Invalid Token' });    
    }
} 

module.exports = validateJWT;