const dbConn = require('../server/db.js');

module.exports = (req, res) => {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            const erro = JSON.stringify({ cod: 400, mensagem: "Dados incompletos!" });
            throw new Error(erro);
        }

        const queryInfos = {
            primeiraParte: "INSERT INTO emails (id, nome, email)",
            segundaParte: `VALUES (NULL, "${nome}", "${email}")`
        };

        dbConn.query(`${queryInfos["primeiraParte"]} ${queryInfos["segundaParte"]}`, (erroDB) => {
            if (erroDB) {
                const erro = JSON.stringify({ cod: 502, mensagem: "Erro ao inserir no banco de dados!" });
                throw new Error(erro);
            }

            res.status(201).send({ status: "Sucesso", mensagem: "Dados adicionandos!" });
        });
    } catch ({ message }) {
        const { cod, mensagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", mensagem });    
    }
}
