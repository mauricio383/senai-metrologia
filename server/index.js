// Adicionando pacotes para o servidor rodar.
const http = require('http'); 
const express = require('express') 
const app = express() 
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');

// Configurações do servidor.
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser());

// Carregando configurações do cors.
const corsConfig = require('./corsCofnig.js');
corsConfig(app);

// Carregando banco de dados.
const dbConn = require('./db.js');
dbConn.connect();

// Carregando rotas da API.
const rotas = require('./rotas.js');
rotas(app);

// Inicia o servidor com as rotas na porta 3001.
const server = http.createServer(app); 
server.listen(8000, '127.0.0.1');
console.log('Servidor escutando na porta 8000...');
