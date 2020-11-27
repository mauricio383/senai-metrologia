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

// Adiciona o pacote para fazer as consultas MySQL.
const mysql = require('mysql');

// Configurando a conexão com o banco MySQL.
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'SENAI',
    password: 'senai115metrologia',
    database: 'metrologia'
});

// Conectando a aplicação ao banco.
dbConn.connect();

// Criando rota para salvar os dados no DB.
app.post('/medidas', (req, res, next) => {
    // Bloco para testar erros.
    try {
        // Puxo os valores do body da requisição para usalos soltos.
        const { temperatura, umidade, data, nome_sensor } = req.body;

        // Testando se os dados não foram definidos.
        if (!temperatura || !umidade || !data || !nome_sensor) {
            // Caso estejam vazios, lança um erro.
            const erro = JSON.stringify({ cod: 400, menssagem: "Dados incompletos!" });
            throw new Error(erro);
        }

        // Testando se os valores de temperatura e umidade são numéricos.
        if (isNaN(temperatura) || isNaN(temperatura)) {
            // Caso não sejam numéricos, lança um erro.
            const erro = JSON.stringify({ cod: 406, menssagem: "Dados inválidos!" });
            throw new Error(erro);
        }

        // Caso passe pelos testes.
        res.status(201).send({ status: "Sucesso", menssagem: "Dados adicionandos!" });
    } catch ({ message }) {
        const { cod, menssagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", menssagem });
    }
});

// Criando rota para buscar os dados no DB.
app.get('/medidas', (req, res, next) => {

});

// Inicia o servidor com as rotas na porta 3001.
var server = http.createServer(app); 
server.listen(3001);
console.log("Servidor escutando na porta 3001...");
