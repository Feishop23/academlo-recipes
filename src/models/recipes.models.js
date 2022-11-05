const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const Users = require('./users.models')
const Categories = require('./categories.models')


const Recipes = db.define('recipes',{
    id: {
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey: true
    },
    title:{
        type:DataTypes.STRING,
        allowNull: false,
        //el validate es asi: quiero que me valides como minimo sean 5 caracteres
        validate:{
            min: 5
        }
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    urlImg: {
        type: DataTypes.STRING,
        //El tipo de dato debe de tener una url
        validate:{
            isUrl: true
        },
        field: 'url_img'
    },
    time:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    portions:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    //asi se hace la llave foranea
    userId:{
        type:DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references:{
            key:'id',
            model: Users
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'category_id',
        references:{
            key: 'id',
            model: Categories //Todo agregar el modelo una vez creado
        }
    },
    origin:{
        type: DataTypes.STRING,

    },
    likes:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0 //El valor por default es 0 
    }

})

module.exports = Recipes