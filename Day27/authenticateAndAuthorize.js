const jwt = require('jsonwebtoken');

const authenticateAndAuthorize = (requiredRole) => {
    return (req, res, next) => {
        const { headers } = req;
        const authHeader = headers.authorization || headers[`authorization`];
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        try {
            const decodedToken = jwt.verify(token, 'SECRET_KEY_STORED_IN_ENV_VARIABLE');
            if (decodedToken.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = decodedToken;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
};

module.exports = authenticateAndAuthorize;