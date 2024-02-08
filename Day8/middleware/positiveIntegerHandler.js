function positiveIntegerHandler(req, res, next) {
    const number = parseInt(req.query.number);
    if (isNaN(number) || number <= 0 || !Number.isInteger(number)) {
        const error = new Error('Invalid number. Please provide a positive integer.');
        error.status = 400;
        next(error);
    } else {
        res.status(200).json({ message: 'Number is valid.' });
    }
}

module.exports = { positiveIntegerHandler };