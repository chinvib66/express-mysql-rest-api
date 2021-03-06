module.exports = (sequelize, type) => {
    return sequelize.define('question', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        question: {
         type:  type.STRING,
         allowNull: false,
         defaultValue:'',
        },
        description: {
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
