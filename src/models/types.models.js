const {DataTypes} = require('sequelize')
const db = require('../utils/database')

const Types = db.define('types',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    //Evita que sequilize cree la columna de createdAt y updateAt
    timestamps: false
})

module.exports = Types