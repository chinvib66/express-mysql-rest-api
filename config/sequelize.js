const Sequelize = require('sequelize')
const UserModel = require('../models/user'),
      ProfileModel = require('../models/profile'),
      MeetingModel = require('../models/meeting'),
      PostModel   = require('../models/post'),
      QuestionModel   = require('../models/question'),
      NoteModel   = require('../models/note');

/*
const sequelize = new Sequelize('test','root','', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
*/

const sequelize = new Sequelize('postgres://pcogqisgjnddyr:d1c882abe0f1182ebc7278a971518774bcea435e8ee7b102ff74bd41aa89ec4b@ec2-54-235-90-0.compute-1.amazonaws.com:5432/d429c57voe1fka')

const User = UserModel(sequelize, Sequelize)  
const Profile = ProfileModel(sequelize,Sequelize) 
const Meeting = MeetingModel(sequelize,Sequelize) 
const Post = PostModel(sequelize, Sequelize)  
const Question = QuestionModel(sequelize, Sequelize)  
const Note = NoteModel(sequelize, Sequelize)  

User.hasOne(Profile,{targetKey: 'user_id',onDelete: 'CASCADE'})  

sequelize.sync().then(() => {
    console.log(`Database & tables created!`)
  })

  module.exports = {
  User,Profile, Meeting, Post, Question, Note
}
