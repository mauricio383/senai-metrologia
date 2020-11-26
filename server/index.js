// Adicionando pacotes para o servidor rodar.
const http = require('http'); 
const express = require('express') 
const app = express() 
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
// Adicionando o pacote que resolver o problema de cors da API.
const cors = require('cors');

// Resolvendo problema de cors do site.
app.use((req, res, next) => {
    // Qual site tem permissão de realizar a conexão.
    // O "*" define que qualquer site pode usar a API.
    res.header("Access-Control-Allow-Origin", "*");
	// Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

// Configurações do servidor.
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cookieParser());

// Criando rota para salvar os dados no DB.
app.post('/medidas', (req, res, next) => {

});

// Criando rota para buscar os dados no DB.
app.get('/medidas', (req, res, next) => {

});

// Inicia o servidor com as rotas na porta 3001.
var server = http.createServer(app); 
server.listen(3001);
console.log("Servidor escutando na porta 3001...");
