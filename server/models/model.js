const sequelize = require('../db');
const {DataTypes} = require ('sequelize');

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, notNull:true},
    email:{type: DataTypes.STRING, notNull:true},
    password:{type: DataTypes.STRING, notNull:true},
    role:{type: DataTypes.STRING,defaultValue:"USER"},
})

module.exports = User

console.log( User === sequelize.models.User, "CHECK MODEL")
//console.log(User.create(), "User")
console.log(sequelize.models, "sequelize.models")

