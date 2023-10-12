const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const {registrationValidation} = require("../validators/auth");
const {validationMiddleware} = require("../middleware/validations-middleware");

router.post('/registration',registrationValidation,validationMiddleware, userController.createUser)
router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getUser)
//router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router;