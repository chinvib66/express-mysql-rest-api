module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
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
