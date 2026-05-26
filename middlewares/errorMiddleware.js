

const errorHandler = (err, req, res, next) => {

    const status = err.statusCode || 400;
    const message = err.message || "Invalid request!";

    res.status(status).json({
        success: false,
        message: message
    })
}

module.exports = errorHandler;