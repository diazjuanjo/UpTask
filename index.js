const express = require('express');
const routes = require('./ routes');
const path = require('path');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');

// helpers con algunas funciones
const helpers = require('./helpers');

//  Crear la conexion a la DB
const db = require('./config/db');

// Importar el Modelo
require('./models/Proyectos')

db.sync()
    .then(()=>console.log('Conectado al Servidor'))
    .catch((error)=>console.log(error))


// crear una app de express
const app = express();

// Agregamos express validator a toda la aplicacion
// app.use(expressValidator());

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');
// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar vardump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes());

app.listen(3000);