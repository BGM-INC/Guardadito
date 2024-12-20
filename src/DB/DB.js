const mysql = require('mysql');
const config = require('../config.js');
const { reject } = require('any-promise');

const dbconfig  = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err) {
            console.error('[db err]}', err);
            setTimeout(conMysql,200);
        }
        else{
            console.log('conectado a la base de datos');
        }
    });
    conexion.on('error', err => {
        console.error('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
};
conMysql();

function todos (tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject (error) : resolve (result);
        })
    });
}

function uno (tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject (error) : resolve (result);
        })
    });
}

function insertar (tabla, datos){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, datos, (error, result) => {
            return error ? reject (error) : resolve (result);
        })
    });
}

function actualizar (tabla, datos){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [datos, datos.id], (error, result) => {
            return error ? reject (error) : resolve(result);
        })
    });
}

function agregar (tabla, datos){
    if (datos && datos.id == 0){
        return insertar (tabla , datos);
    }
    else {
        return actualizar (tabla, datos);
    }
}

function eliminar (tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject (error) : resolve(result);
        })
    });
}

module.exports = {
    todos,
    uno,
    insertar,
    actualizar,
    agregar,
    eliminar
}