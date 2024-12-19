const express = require ('express');
const morgan = require ('morgan');
const config = require ('./config');

//Inicializacion del servidor
const app = express ();

//Middleware
app.use (morgan ('dev'));
app.use (express.json());
app.use (express.urlencoded({ extended:true}));

//Confuguracion del puerto
app.set ('port', config.app.port);

//API REST

app.
module.exports;