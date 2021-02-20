const dbConn = require('../server/db.js');

module.exports = (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            const erro = JSON.stringify({ cod: 400, mensagem: "Dados incompletos!" });
            throw new Error(erro);
        }

        dbConn.query(`DELETE FROM emails WHERE id = ${id}`, (erroDB) => {
            if (erroDB) {
                const erro = JSON.stringify({ cod: 502, mensagem: "Erro ao deletar no banco de dados!" });
                throw new Error(erro);
            }

            res.status(201).send({ status: "Sucesso", mensagem: "Dados removidos!" });
        });
    } catch ({ message }) {
        const { cod, mensagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", mensagem });    
    }
}
