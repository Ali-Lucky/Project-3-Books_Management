const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const Validator = require('../middleware/validator')

router.post("/register",Validator.userValidation, userController.createUser)

router.post("/login", Validator.logInValidation, userController.login)

//=====================Module Export=====================//
module.exports = router;   