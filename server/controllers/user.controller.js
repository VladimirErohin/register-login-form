const User = require('../models/model');

class UsersController {
    async createUser(req, res) {
        //const {id,name, email,password, role} = req.body;
        const {name, email} = req.body;
       // const user = await User.create({id,name, email,password, role})
        const user = await User.create({name, email})
        console.log(name, email);
        //console.log('user', user)
        return res.json(user)
        //return res.json('ok')
    }

    async getUsers(req, res) {

    }

    async getUser(req, res) {

    }

    async updateUser(req, res) {

    }

    async deleteUser(req, res) {

    }
}

module.exports = new UsersController();