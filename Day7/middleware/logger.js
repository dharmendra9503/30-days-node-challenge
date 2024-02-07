const requestLoggerMiddleware = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} request received`);
    next();
}

module.exports = {
    requestLoggerMiddleware
}