// const userController = require('../controller/userController');
const userModel = require('../model/userModel');

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

//////////////////////////////////////////  User Validation ///////////////////////////////////////////////////////////////////

const userValidation = async function (req, res, next) {
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

    const isPhoneAlreadyUsed = await userModel.findOne({phone})
    if (isPhoneAlreadyUsed) return res.status(404).send({ status: false, msg: "Phone is already used" })
    if (!Email) return res.status(404).send({ status: false, msg: "Invalid email" })

    const isEmailAlreadyUsed = await userModel.findOne({email})
    if (isEmailAlreadyUsed) return res.status(404).send({ status: false, msg: "Email is already used" })
    if (!Password) return res.status(404).send({ status: false, msg: "Invalid password" })
    next();
}

const logInValidation = async function (req, res, next) {
    let data = req.body
    let {email, password, ...rest} = { ...data }

    if (Object.keys(rest) != 0) return res.status(400).send({ status: false, msg: "please provide EmaliId and Password only"})
    if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "Please provide details" })

    if (!email || !password) return res.status(400).send({ status: false, msg: "Please enter email and password both" })

    next();
}


module.exports = { userValidation, logInValidation }