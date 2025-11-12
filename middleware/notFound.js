function notFound(req, res, next) {
    res.status(404).json({
        error: true,
        message: 'endpoint notfount, 404'
    })
}

module.exports = notFound;