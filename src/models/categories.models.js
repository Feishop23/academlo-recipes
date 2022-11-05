const { DataTypes } = require('sequelize')
const db = require('../utils/database')

const Categories = db.define('categories',{
id:{
    type:DataTypes.INTEGER,
    autoIncrement: true, //numero cerealizado el anterior era 1 el otro sera 2
    primaryKey:true, // definirlo como llave primaria nos va ayudat a difereciar entre las categorias
    allowNull: false 
},
name:{
    type:DataTypes.STRING,
    allowNull:false,
    unique: true
}},
{
//Evita que sequilize cree la columna de createdAt y updateAt
    timestamps: false
})

module.exports = Categories