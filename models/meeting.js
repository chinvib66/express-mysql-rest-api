module.exports = (sequelize, type) => {
    return sequelize.define('meet', {
        
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        parti1:type.INTEGER,
        parti2:type.INTEGER,
        parti3:type.INTEGER,
        location :{
            type: type.STRING,
            allowNull: true
        },
        description :{
            type: type.STRING,
            allowNull: true,
            defaultValue: 'Description'
        },
        agenda:{
            type: type.STRING,
            allowNull: true,
            defaultValue: 'Agenda'
        },
        status:{
            type: type.STRING,
            allowNull: false,
            defaultValue:'Active'
        }
        
    })
}
