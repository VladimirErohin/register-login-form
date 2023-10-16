const User = require('../models/model');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

class UserController {
    async createUser(req, res, next) {
        try {
            // //const errors = validationResult(req);
            //
            const {id, name, email, password, role} = req.body;

            const hashedPassword = await bcrypt.hash(password, 5);

            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                console.log("errors --- ", "Пользователь с таким email уже существует")
                return res.json("Пользователь с таким email уже существует")
            }
             const user = await User.create({id, name, email, password:hashedPassword, role})
            return res.status(201).json({
                success:true,
                message:'The registration ws successfully'
            })

            // return res.json(user)
            // //return res.json('ok')

            //console.log("CHECK!!!")
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                error:error.message
            })
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