const User = require('../models/model');
const {validationResult} = require('express-validator');

class UserController {
    async createUser(req, res, next) {
        try {
            //const errors = validationResult(req);

            const {id, name, email, password, role} = req.body;

            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                console.log("errors --- ", "Пользователь с таким email уже существует")
                return res.json("Пользователь с таким email уже существует")
            }
            const user = await User.create({id, name, email, password, role})
            return res.json(user)
            //return res.json('ok')
        } catch (e) {
            console.log(e.message)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (e) {
            console.log(e.message)
        }

    }

    async getUser(req, res) {
        try {
            const id = req.params.id;
            const remoteUser = await User.findOne({where: {id}});
            res.json(remoteUser);
        } catch (e) {
            console.log(e.message)
        }
    }

    // async updateUser(req, res) {
    //     try{
    //         const {id, name, email} = req.body;
    //         const user = await User.update({
    //                 name:name,
    //                 email:email,
    //             },
    //             {where: {id:id}}
    //         );
    //         res.json(user);
    //     }catch (e) {
    //         console.log(e.message)
    //     }
    //
    // }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const remoteUser = await User.destroy({where: {id}});
            res.json(remoteUser);
        } catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = new UserController();