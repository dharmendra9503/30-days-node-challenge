const jwt = require('jsonwebtoken');

const generateToken = (userId, userType, userDisplayName) => {
	try {
		const options = {
			expiresIn: '1d'
		};
		const data = {
			userId,
			userDisplayName,
			userType
		};
		const token = jwt.sign(data, 'dharmendra', options);
		return token;
	} catch (error) {
		return false;
	}
};

const validateToken = token => {
	try {
		const payload = jwt.verify(token, 'dharmendra');
		return {
			success: true,
			data: payload
		};
	} catch (error) {
		return {
			success: false,
			data: error
		};
	}
};
// Get user details from token
const getLoggedInUser = token => {
	const data = jwt.verify(token, 'dharmendra');
	return data.userId || null;
};

module.exports = {
	generateToken,
	validateToken,
	getLoggedInUser
};
