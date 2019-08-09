const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express() //app sería nuestro servidor de express

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true})//Se conecta a la base de datos
const connection = mongoose.connection //Se instancia una conexion, se abre el puerto.

connection.once('open',() =>{console.log("mongodb BD conectada exitosamente")}) // Se conecta e informa por consola el estado.

const exercisesRouter=require('./routes/exerciser')
const usersRouter=Require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter) 

app.listen(port, ()=> {console.log(`servidor corriendo en puerto ${port}`)}) //abre el puerto de "escucha"