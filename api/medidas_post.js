const dbConn = require('../server/db.js');

module.exports = (req, res) => {
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
}
