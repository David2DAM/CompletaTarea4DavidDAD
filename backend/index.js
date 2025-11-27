//importo el express y el cors
import express from 'express';
import cors from 'cors';
import * as login from './services/login.js';
import * as item from '../src/backend/services/item.js';
//import { deleteData } from '../src/backend/services/item.js';

//const express = require('express')
//const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
//const login = require('./services/login')
import { deleteData } from "../src/backend/services/item.js";
//const item = require("../src/backend/services/item.js")

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

app.get('/addItem', async function(req, res, next) {
  const { nombre, marca, tipo, precio } = req.query;

  try {
    res.json(
      await item.insertData(nombre, marca, tipo, precio)
    );
  } catch (err) {
    console.error(`Error while inserting items `, err.message);
    next(err);
  }
});


app.get('/getItems', async function(req, res, next) {
  try {
    res.json(await item.getData(req));
  } catch (err) {
    console.error(`Error while getting items`, err.message);
    next(err);
  }
});

app.get('/deleteItem', async function(req, res, next) {
try {
res.json(await deleteData(req))
 } catch (err) {
console.error(`Error while deleting items `, err.message);
next(err);
 }
})



//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)