const dbConn = require('../server/db.js');

module.exports = (req, res) => {
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

                return {
                    id,
                    nome_sensor,
                    temperatura,
                    umidade,
                    data: `${novaData.getDate()}/${novaData.getMonth() + 1}`,
                    hora: `${novaData.getHours() - 3}h${novaData.getMinutes()}m`
                }
            });

            res.status(200).send(json);
        });
    } catch ({ message }) {
        // Resposta enviada caso ocorra algum erro.
        // const { cod, mensagem } = JSON.parse(message);
        // res.status(cod).send({ status: "Falha", mensagem });
        res.send({ msg: message });
    }
}
