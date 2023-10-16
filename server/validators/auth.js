const {check} = require('express-validator');
const User = require("../models/model");

//name
const name = check('name')
    .not().isEmpty()
    .isLength({max: 10})
    .withMessage("поле обязательно для заполнения, не более 10 букв")
    .matches(/^[A-Za-zА-Яа-яЁё]+$/).withMessage('вводите только буквы латиницы/кириллицы')

    // .withMessage("от 3х до 6ти букв");

//email
const email = check('email')
    .isEmail()
    .withMessage("введите валидный email формат");


//password
const password = check('password')
    .not().isEmpty()
    //.isLength({min: 3, max: 10})
    //.withMessage("поле обязательно для заполнения, от 3х до 10ти букв")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}.$/)
    .withMessage('cтрочные и прописные латинские буквы, цифры, спецсимволы, минимум 8 символов')

//check if email exists
// const emailExists = check('email')
//     .custom(async (req, res) => {
//         const {email} = req.body;
//         const candidate = await User.findOne({where: {email}})
//     //const users = await User.findAll();
//         console.log("candidate ---- ", candidate)
//
//         if (candidate) {
//             throw new Error("Email уже существует")
//         }
//
//     // if (users.length) {
//     //     throw new Error("Email уже существует")
//     // }
// })

module.exports = {
    registrationValidation: [name, email, password],
}