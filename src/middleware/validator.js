const UserModel = require('../model/userModel');
const BookModel = require('../model/booksModel')
const ObjectId = require('mongoose').Types.ObjectId

/////////////////////////////////////////////////////////  Regex For Validation  /////////////////////////////////////////////////////////////////////


const isValidName = function (body) {
    const nameRegex = /^[a-zA-Z_ ]*$/;
    return nameRegex.test(body)
}

const isValidPhone = function (body) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(body)
}

const isValidEmail = function (body) {
    const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(body)
}

const isValidPassword = function (body) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
    return passwordRegex.test(body)
}

const isValidTitle = function (body) {
    const nameRegex = /^[a-zA-Z_ ]*$/;
    return nameRegex.test(body)
}

const isValidISBN = function (body) {
    const nameRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return nameRegex.test(body)
}

const isValidDate = function (body) {
    const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    return dateRegex.test(body)
}

///////////////////////////////////////////////  User Validation  ///////////////////////////////////////////////////////////

const userValidation = async function (req, res, next) {
    try {
        let userDetails = req.body
        let { title, name, phone, email, password, address, ...rest } = { ...userDetails };
    
        if (Object.keys(rest) !=0 ) return res.status(404).send({ status: false, msg: "Please provide required details only => title, name, phone, email, password & address"})
        if (Object.keys(userDetails) == 0) return res.status(404).send({ status: false, msg: "Please provide details" })
    
        if (!title) return res.status(404).send({ status: false, msg: "title is required" })
        if (title != [ "Mr" || "Miss" || "Mrs" ]) return res.status(404).send({ status: false, msg: "Please provide title between [Mr / Miss / Mrs]"})
        if (!name) return res.status(404).send({ status: false, msg: "name is required" })
        if (!phone) return res.status(404).send({ status: false, msg: "phone is required" })
        if (!email) return res.status(404).send({ status: false, msg: "email is required" })
        if (!password) return res.status(404).send({ status: false, msg: "password is required" })
    
        let [Name, Phone, Email, Password] = [ isValidName(name), isValidPhone(phone), isValidEmail(email), isValidPassword(password) ];
    
        if (!Name) return res.status(404).send({ status: false, msg: "Invalid name" })
        if (!Phone) return res.status(404).send({ status: false, msg: "Invalid phone" })
    
        const isPhoneAlreadyUsed = await UserModel.findOne({phone})
        if (isPhoneAlreadyUsed) return res.status(404).send({ status: false, msg: "Phone is already used" })
        if (!Email) return res.status(404).send({ status: false, msg: "Invalid email" })
    
        const isEmailAlreadyUsed = await UserModel.findOne({email})
        if (isEmailAlreadyUsed) return res.status(404).send({ status: false, msg: "Email is already used" })
        if (!Password) return res.status(404).send({ status: false, msg: "Password must have 8 to 15 characters with at least one lowercase, uppercase, numeric value and a special character" })

        next();

    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

//////////////////////////////////////////// Login Validation /////////////////////////////////////////////////////////////

const logInValidation = async function (req, res, next) {
    try {
        let data = req.body
        let {email, password, ...rest} = { ...data }
    
        if (Object.keys(rest) != 0) return res.status(400).send({ status: false, msg: "please provide EmaliId and Password only"})
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "Please provide details" })
    
        if (!email || !password) return res.status(400).send({ status: false, msg: "Please enter email and password both" })
    
        next();
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

///////////////////////////////////////////////////// Book Validation ////////////////////////////////////////////////////

const bookValidation = async function (req, res, next) {
    try {
        let bookDetails = req.body
        let { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt, ...rest } = { ...bookDetails }
    
        if (Object.keys(rest) != 0) return res.status(400).send({ status: false, msg: "Please provide required details only => title, excerpt, userId, ISBN, category, subcategory, reviews & releasedAt" })
        if (Object.keys(bookDetails) == 0) return res.status(400).send({ status: false, msg: "Please provide details" })
        if (!ObjectId.isValid(userId)) return res.status(400).send({ status: false, msg: "Invalid userId" })
    
        if (!title) return res.status(404).send({ status: false, msg: "title is required" })
        if (!excerpt) return res.status(404).send({ status: false, msg: "excerpt is required" })
        if (!userId) return res.status(404).send({ status: false, msg: "userId is required" })
        if (!ISBN) return res.status(404).send({ status: false, msg: "ISBN is required" })
        if (!category) return res.status(404).send({ status: false, msg: "category is required" })
        if (!subcategory) return res.status(404).send({ status: false, msg: "subcategory is required" })
        if (!releasedAt) return res.status(404).send({ status: false, msg: "releasedAt is required" })
    
        const isTitleAlreadyUsed = await BookModel.findOne({ title })
        if (isTitleAlreadyUsed) return res.status(400).send({ status: false, msg: "Title is already used" })
        if (!isValidTitle(title)) return res.status(404).send({ status: false, msg: "Invalid title" })
    
        const validateUserId = await UserModel.findById(userId)
        if (!validateUserId) return res.status(400).send({ status: false, msg: "User not found" })
    
        const isISBNalreadyUsed = await BookModel.findOne({ ISBN })
        if (isISBNalreadyUsed) return res.status(400).send({ status: false, msg: "ISBN is already used"})
        if (!isValidISBN(ISBN)) return res.status(404).send({ status: false, msg: "ISBN must have 10 or 13 numbers" })

        if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, msg: "Please send releasedAt in 'YYYY-MM-DD' format" })
    
        next();
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

module.exports = { userValidation, logInValidation, bookValidation }