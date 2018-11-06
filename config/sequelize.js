const Sequelize = require('sequelize')
const UserModel = require('../models/user'),
      ProfileModel = require('../models/profile'),
      MeetingModel = require('../models/meeting')

/*      
const sequelize = new Sequelize('db1',null,null, {
  host: 'localhost',
  //dialect: 'mysql',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: '../db1.sqlite3'
})
*/

const sequelize = new Sequelize('postgres://pcogqisgjnddyr:d1c882abe0f1182ebc7278a971518774bcea435e8ee7b102ff74bd41aa89ec4b@ec2-54-235-90-0.compute-1.amazonaws.com:5432/d429c57voe1fka')

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
