const jwt = require('jsonwebtoken');
const config = require('../helpers/infra/global_config');

const jwt_secret = config.get('/jwt_secret');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, jwt_secret, { expiresIn: '3h' })
  return token
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { generateToken, verifyToken };
