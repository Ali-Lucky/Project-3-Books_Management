const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controller/userController')
const { createBook, getBooks, getBooksById, updateBooks, deleteBookById } = require('../controller/bookController')
const { createReview, updateReview, deleteReview } = require('../controller/reviewController')
const { userValidation, logInValidation, bookValidation, reviewValidation } = require('../middleware/validator')
const { authentication, authorisation } = require('../middleware/commonMiddleware')


////////////////////////////////////////////////////////  APIS  /////////////////////////////////////////////////////////////////

//  User apis  //

router.post("/register", userValidation, createUser)
router.post("/login", logInValidation, login)

//  Book apis  //

router.post("/books", authentication, bookValidation, createBook)
router.get("/books", authentication, getBooks)
router.get("/books/:bookId", authentication, getBooksById)
router.put("/books/:bookId", authentication, authorisation, updateBooks)
router.delete("/books/:bookId", authentication, authorisation, deleteBookById)

// Review apis //

router.post("/books/:bookId/review", reviewValidation, createReview)
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteReview)

module.exports = router;   