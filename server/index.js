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
const mysql = require('mysql8');

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
        const { temperatura, umidade, nome_sensor } = req.body;

        // Testando se os dados não foram definidos.
        if (!temperatura || !umidade || !nome_sensor) {
            // Caso estejam vazios, lança um erro.
            const erro = JSON.stringify({ cod: 400, mensagem: "Dados incompletos!" });
            throw new Error(erro);
        }

        // Testando se os valores de temperatura e umidade são numéricos.
        if (isNaN(temperatura) || isNaN(umidade)) {
            // Caso não sejam numéricos, lança um erro.
            const erro = JSON.stringify({ cod: 406, mensagem: "Dados inválidos!" });
            throw new Error(erro);
        }

        let data = new Date();
        const GMT = data.getTimezoneOffset() / 60;

        if (data.getDay() === 0 ) {
            const erro = JSON.stringify({ cod: 503, mensagem: "Serviço não opera neste dia!" });
            throw new Error(erro);
        }

        if ( (data.getHours() - GMT) < 8 || ((data.getHours() - GMT) >= 23 && data.getMinutes() !== 0 ) ) {
            const erro = JSON.stringify({ cod: 503, mensagem: "Serviço não opera neste horário!" });
            throw new Error(erro);
        }

        if (data.getMinutes() % 15 !== 0 ) {
            const erro = JSON.stringify({ cod: 503, mensagem: "O intervalo de tempo não é permitido!" });
            throw new Error(erro);
        }

        data = data.toISOString().slice(0, 19).replace("T", " ");

        // Comandos MySQL.
        const queryInfos = {
            primeiraParte: "INSERT INTO dados_metrologia (id, nome_sensor, temperatura, umidade, data)",
            segundaParte: `VALUES (NULL, "${nome_sensor}", "${Number(temperatura)}", "${Number(umidade)}", "${data}")`
        };

        // Faz a consulta o banco de dados.
        dbConn.query(`${queryInfos["primeiraParte"]} ${queryInfos["segundaParte"]}`, (erroDB) => {
            // Testa se deu algum erro, caso tenha lança uma execessão.
            if (erroDB) {
                // Caso ocorra algum erro na query.
                const erro = JSON.stringify({ cod: 502, mensagem: "Erro ao inserir no banco de dados!" });
                throw new Error(erro);
            }
            
            // Caso passe pelos testes.
            res.status(201).send({ status: "Sucesso", mensagem: "Dados adicionandos!" });
        });
    } catch ({ message }) {
        // Resposta enviada caso ocorra algum erro.
        const { cod, mensagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", mensagem });
    }
});

// Criando rota para buscar os dados no DB.
app.get('/medidas', (req, res, next) => {
    try {
        const { _nome_sensor, _limite } = req.query;

        // Comandos MySQL.
        const queryInfos = {
            WHERE: (_nome_sensor) ? `WHERE nome_sensor = "${_nome_sensor}"` : "",
            LIMIT: (_limite) ? Number(_limite) : 300 
        };
    
        // Faz a consulta o banco de dados.
        dbConn.query(`SELECT * FROM dados_metrologia ${queryInfos["WHERE"]} ORDER BY id DESC LIMIT ${queryInfos["LIMIT"]}`, (erroDB, resDB) => {
            // Testa se deu algum erro, caso tenha lança uma execessão.
            if (erroDB) {
                // Caso ocorra algum erro na query.
                const erro = JSON.stringify({ cod: 502, mensagem: "Erro ao buscar no banco de dados!" });
                throw new Error(erro);
            }
    
            // Testa se a consulta trouxe algum dado.
            if (resDB.length === 0) {
                // Caso não sejam numéricos, lança um erro.
                const erro = JSON.stringify({ cod: 404, mensagem: "Problema ao procurar o dado solicitado!" });
                throw new Error(erro);
            }

            // Caso tenha trago retorna os dados.
            const json = resDB.map((dado) => {
                const { id, nome_sensor, temperatura, umidade, data } = dado;
                const novaData = new Date(data);
                const GMT = novaData.getTimezoneOffset() / 60;

                return {
                    id,
                    nome_sensor,
                    temperatura,
                    umidade,
                    data: `${novaData.getDate()}/${novaData.getMonth() + 1}`,
                    hora: `${novaData.getHours() - GMT}h${novaData.getMinutes()}m`
                }
            });

            res.status(200).send(json);
        });
    } catch ({ message }) {
        // Resposta enviada caso ocorra algum erro.
        const { cod, mensagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", mensagem });
    }
});

// Inicia o servidor com as rotas na porta 3001.
const server = http.createServer(app); 
server.listen(8000, '127.0.0.1');
console.log("Servidor escutando na porta 8000...");
