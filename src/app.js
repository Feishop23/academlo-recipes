//? Dependencies
const cors = require('cors')
const express = require('express');
const swaggerUi = require('swagger-ui-express')
const db = require('./utils/database')

//? Files
const swaggerDoc = require('../swagger.json')
const {port} = require('./config');
//* Routes
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const categoryRouter = require('./categories/categories.router')
const recipeRouter = require('./recipes/recipes.router')
const ingredientsRouter = require('./ingredients/ingredients.router')

const initModels = require('./models/initModels')

//? Initial Configs
const app = express()

app.use(express.json())

app.use(cors())


db.authenticate()
    .then(() => {
        console.log('Database Authenticated')
    })
    .catch(err => {
        console.log(err)
    })

db.sync()
    .then(() => {
        console.log('Database Synced')
    })
    .catch(err => {
        console.log(err)
    })

initModels()


app.get('/',(req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
})

app.use('/api/docs', swaggerUi.serve, swaggerUi.serve(swaggerDoc))
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/recipes', recipeRouter)
app.use('/api/v1/ingredients', ingredientsRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

