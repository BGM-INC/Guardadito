const db = require('../../DB/DB.js');

const TABLA = 'recordatorios';

module.exports = 
    function (dbInyectada){
    let db = dbInyectada;
    if(!db){
        db = require ('../../DB/DB.js');
    }

    function todos (){
        return db.todos(TABLA); 
    }

    function uno (id){
        return db.uno(TABLA,id);
    }

    function agregar (datos){
        return db.agregar(TABLA,datos);
    }
    function eliminar (id){
        return db.eliminar(TABLA,id);
    }

    return {
        todos,
        uno,
        agregar,
        eliminar
    }
}