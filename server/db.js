// Adiciona o pacote para fazer as consultas MySQL.
const mysql = require('mysql8');
require('dotenv/config');

// Configurando a conexão com o banco MySQL.
const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Conectando a aplicação ao banco.
module.exports = dbConn;
