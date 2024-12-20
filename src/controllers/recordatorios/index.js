const db = require('../../DB/DB.js');
const ctrl = require('./controller-recordatorios.js');

module.exports = ctrl(db);