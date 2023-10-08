const sequelize = require('../db');
const {DataTypes} = require ('sequelize');

const User = sequelize.define('User',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING},
    email:{type: DataTypes.STRING, unique: true},
    password:{type: DataTypes.STRING},
    role:{type: DataTypes.STRING,defaultValue:"USER"},
})

module.exports = User

console.log( User === sequelize.models.User, "CHECK MODEL")
console.log(User.create(), "User")
console.log(sequelize.models, "sequelize.models")

