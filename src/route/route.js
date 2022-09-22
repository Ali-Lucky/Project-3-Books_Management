const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controller/userController')
const { createBook, getBooks, getBooksById, updateBooks, deleteBookById } = require('../controller/bookController')
const { userValidation, logInValidation, bookValidation } = require('../middleware/validator')
const { authentication, authorisation } = require('../middleware/commonMiddleware')


////////////////////////////////////////////////////////  APIS  /////////////////////////////////////////////////////////////////

//  User apis 

router.post("/register", userValidation, createUser)
router.post("/login", logInValidation, login)

//  Book apis

router.post("/books", authentication, bookValidation, createBook)
router.get("/books", authentication, getBooks)
router.get("/books/:bookId", authentication, getBooksById)
router.put("/books/:bookId", authentication, authorisation, updateBooks)
router.delete("/books/:bookId", authentication, authorisation, deleteBookById)

module.exports = router;   