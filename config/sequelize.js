const Sequelize = require('sequelize')
const UserModel = require('../models/user'),
      ProfileModel = require('../models/profile'),
      MeetingModel = require('../models/meeting'),
      PostModel   = require('../models/post'),
      QuestionModel   = require('../models/question'),
      NoteModel   = require('../models/note');

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
