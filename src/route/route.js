const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controller/userController')
const { createBook, getBooks } = require('../controller/bookController')
const { userValidation, logInValidation, bookValidation } = require('../middleware/validator')
const { authentication } = require('../middleware/commonMiddleware')

router.post("/register",Validator.userValidation, userController.createUser)


//**    APIS   **//

//  User apis 

router.post("/register", userValidation, createUser)
router.post("/login", logInValidation, login)

//  Book apis

router.post("/books", authentication, bookValidation, createBook)
router.get("/books", authentication, getBooks)

module.exports = router;   
