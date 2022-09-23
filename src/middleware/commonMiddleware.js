const JWT = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId
const BookModel = require('../model/booksModel')

//////////////////////////////////////////////////// Authentication //////////////////////////////////////////////////////

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

//////////////////////////////////////////////////// Authorisation ///////////////////////////////////////////////////////

const authorisation = async (req, res, next) => {

    try {

        // extracting the userId from the validateToken's sent data( req.validateToken.AuthorId )
        let loggedInUser = req.validateToken.userId

        let bookId = req.params.bookId
        if (!ObjectId.isValid(bookId)) return res.status(400).send({ status: false, msg: "Invalid bookId" })
        
        let book = await BookModel.findById(bookId)
        if (!book) return res.status(400).send({ status: false, msg: "Book does not exist" })
        if (book.isDeleted == true) return res.status(404).send({ status: false, msg: "requested book is already deleted" })

        let requestingUser = book.userId
        
        // checking with two id's that author who is requesting route and whose data in token are the same
        if (loggedInUser != requestingUser) return res.status(404).send({ status: false, msg: "User is not authorised" })
        next()
    } catch (err) {
        res.status(500).send({ status: "error", error: err.message });
    }
}

module.exports = { authentication, authorisation }