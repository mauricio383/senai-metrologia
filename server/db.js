// Adiciona o pacote para fazer as consultas MySQL.
const mysql = require('mysql8');

// Configurando a conexão com o banco MySQL.
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'SENAI',
    password: 'senai115metrologia',
    database: 'metrologia'
});

// Conectando a aplicação ao banco.
module.exports = dbConn;
