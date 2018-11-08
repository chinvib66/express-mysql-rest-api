module.exports = (sequelize, type) => {
    return sequelize.define('post', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        title: {
         type:  type.STRING,
         allowNull: false,
         defaultValue:'',
        },
        content: {
          type:  type.STRING,
          allowNull: true,
          defaultValue:null,
         },
        author: {
          type: type.INTEGER,
          allowNull: true,
          defaultValue:0,
          //unique: true, check in api
        }
    })
}
