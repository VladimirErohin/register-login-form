const {check} = require('express-validator');
const User = require("../models/model");

//name
const name = check('name')
    .not().isEmpty()
    .withMessage("поле обязательно для заполнения")
    // .isLength({min: 3, max: 10})
    // .withMessage("от 3х до 6ти букв");

//password
const password = check('password')
    .isLength({min: 3, max: 10})
    .withMessage("от 3х до 6ти букв");

//email
const email = check('email')
    .isEmail()
    .withMessage("введите валидный email формат");

//check if email exists
// const emailExists = check('email')
//     .custom(async (req, res) => {
//     const users = await User.findAll();
//
//     if (users.length) {
//         throw new Error("Email уже существует")
//     }
// })

module.exports = {
    registrationValidation: [name, email, password],
}