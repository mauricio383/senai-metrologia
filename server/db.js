// Adiciona o pacote para fazer as consultas MySQL.
const mysql = require('mysql8');
require('dotenv/config');

// Configurando a conexão com o banco MySQL.
const dbConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Conectando a aplicação ao banco.
module.exports = dbConn;
