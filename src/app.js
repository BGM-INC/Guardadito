const express = require ('express');
const morgan = require ('morgan');
const config = require ('./config');
const error = require ('./DB/errors.js');

const recordatorios = require ('./controllers/recordatorios/recordatorios.js');

//Inicializacion del servidor
const app = express ();

//Middleware
app.use (morgan ('dev'));
app.use (express.json());
app.use (express.urlencoded({ extended:true}));

//Confuguracion del puerto
app.set ('port', config.app.port);

//API REST
app.use('/api/recordatorios', recordatorios);


app.use(error);
module.exports = app;