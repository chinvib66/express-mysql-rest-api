module.exports = (sequelize, type) => {
    return sequelize.define('profile', {
        
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        user_id: type.INTEGER,
            
        photo:{
            type:type.STRING,
            defaultValue: 'noavatar.jpg',
        },
        bio:{
            type: type.STRING,
            defaultValue: 'About Me',
        },
        current_org:{
            type: type.STRING,
            allowNull: true,
        },
        current_profile:{
            type:type.STRING,
            allowNull:true
        },
        current_pos:{
            type: type.STRING,
            allowNull:true,
        },
        status:{
            type: type.STRING,
            allowNull: false,
            defaultValue:'Active'
        }
        
    })
}
