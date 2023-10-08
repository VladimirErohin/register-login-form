require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/user.routes')

const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);


//app.get('/', (req,res)=>{res.status(200).json({message:'WORKING again!!!'})})
//app.get('/', (req,res)=>{res.send('HEllo!')})


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        console.log('Connection has been established successfully.');

        app.listen(PORT, () => console.log(`server started on post ${PORT}`))
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}

start()