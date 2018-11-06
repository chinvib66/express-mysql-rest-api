const Sequelize = require('sequelize')
const UserModel = require('../models/user'),
      ProfileModel = require('../models/profile'),
      MeetingModel = require('../models/meeting')

const sequelize = new Sequelize('db1', 'root', '', {
  host: 'localhost',
  //dialect: 'mysql',
  dialect: 'sqlite',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: '../db1.sqlite'
})

const User = UserModel(sequelize, Sequelize)  
const Profile = ProfileModel(sequelize,Sequelize) 
const Meeting = MeetingModel(sequelize,Sequelize) 

User.hasOne(Profile,{targetKey: 'user_id',onDelete: 'CASCADE'})  

sequelize.sync().then(() => {
    console.log(`Database & tables created!`)
  })

  module.exports = {
  User,Profile, Meeting
}
