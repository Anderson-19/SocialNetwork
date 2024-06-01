const jwt = require('jsonwebtoken');

const generateJWT = async(payload, duration = '6h') => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration }, (err, token) => {
            if (err) reject('unable to generate token');
            resolve(token);
        })
    })
}

const verifyJWT = async (token = '') => {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return resolve(null);
            resolve(decoded);
        });
    })
}

module.exports = { generateJWT, verifyJWT }

