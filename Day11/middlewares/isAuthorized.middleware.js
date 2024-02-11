const { validateToken } = require('../helpers/jwt');

const isAuthorized = (req, res, next) => {
    const { headers } = req;

    const authHeader = headers.authorization || headers[`authorization`];
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const jwtTokenData = validateToken(token);
    const { success, data: user } = jwtTokenData;
    req.user = user;
    if (!success) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    next();
};

module.exports = isAuthorized;