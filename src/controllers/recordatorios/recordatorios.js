const express = require('express');

const respuesta = require ('../../DB/response.js');
const controlador = require ('./index.js');

const router = express.Router();

router.get('/', todos);
router.get('/:id', obtenerUno);
router.post('/', agregar);
router.delete('/:id', eliminar);

async function todos(req, res) {
    try{
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
    
};

async function obtenerUno(req, res) {
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }
    
};

async function agregar (req, res, next) {
    try{
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Recordatorio guardado con exito';
        }else{
            mensaje = 'Recordatorio actualizado con exito';
        }
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
    
};

async function eliminar(req, res, next) {
    try{
        const items = await controlador.eliminar(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;