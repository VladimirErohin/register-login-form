const User = require('../models/model');

class UserController {
    async createUser(req, res) {
        try {
            const {id, name, email, password, role} = req.body;
            //const {name, email} = req.body;
            const user = await User.create({id, name, email, password, role})
            //console.log(name, email);
            //console.log('user', user)
            return res.json(user)
            //return res.json('ok')
        } catch (e) {
            console.log(e.message)
        }
    }

    async getUsers(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async getUser(req, res) {
        const id = req.params.id;
        const remoteUser = await User.findOne({where: {id}});
        res.json(remoteUser);
    }

    async updateUser(req, res) {
        try{
            const {id, name, email} = req.body;
            const user = await User.update({
                    //id: id,
                    name:name,
                    email:email,
                },
                {where: {id:id}}
            );
            console.log('user -- ', user)
            res.json(user);
        }catch (e) {
            console.log(e.message)
        }

    }

    async deleteUser(req, res) {
        const id = req.params.id;
        const remoteUser = await User.destroy({where: {id}});
        res.json(remoteUser);
    }
}

module.exports = new UserController();