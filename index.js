const express = require('express');
const routes = require('./ routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// helpers con algunas funciones
const helpers = require('./helpers');

//  Crear la conexion a la DB
const db = require('./config/db');

// Importar el Modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(()=>console.log('Conectado al Servidor'))
    .catch((error)=>console.log(error))


// crear una app de express
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}))

// Agregamos express validator a toda la aplicacion
// app.use(expressValidator());

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

app.use(cookieParser());

app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Pasar vardump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
})

app.use('/', routes());

app.listen(3000);