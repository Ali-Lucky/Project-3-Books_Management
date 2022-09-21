const JWT = require('jsonwebtoken')


const authentication = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" })

        let validateToken = JWT.verify(token, "-- plutonium-- project-book-management -- secret-token --")
        if (!validateToken) return res.status(404).send({ status: false, msg: "invalid token" })

        // setting validateToken in the response headers and passing the value of this function's data stored in decodedToken
        req.validateToken = validateToken

        next()
    } catch (err) {
        res.status(500).send({ status: "error", error: err.message });
    }
}


module.exports = { authentication }