module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: {
         type:  type.STRING,
         allowNull: true,
         defaultValue:null,
        },
        
        linkedinId: {
          type: type.STRING,
          allowNull: true,
          defaultValue:null,
          //unique: true, check in api
        },
        googleId: {
          type: type.STRING,
          allowNull: true,
          defaultValue:null,
        },
        mail:{
          type:type.STRING,
          allowNull: false,
          unique: true,
        },
        mail2:{
          type:type.STRING,
          allowNull: true,
          defaultValue: null,
        },
        mail3:{
          type:type.STRING,
          allowNull: true,
          defaultValue: null,
        },
        phone:{
          type: type.STRING,
          allowNull: true,
        },
        password:{
          type: type.STRING,
          allowNull:true,
          defaultValue: null,
        },
        status:{
            type: type.STRING,
            allowNull: false,
            defaultValue:'Active'
        }

    })
}
