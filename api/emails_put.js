const dbConn = require('../server/db.js');

module.exports = (req, res) => {
    try {
        const { nome, email } = req.body;
        const id = req.params.id;

        if (!nome || !email || !id) {
            const erro = JSON.stringify({ cod: 400, mensagem: "Dados incompletos!" });
            throw new Error(erro);
        }

        dbConn.query(`UPDATE emails SET nome = "${nome}", email = "${email}" WHERE id = ${id}`, (erroDB) => {
            if (erroDB) {
                const erro = JSON.stringify({ cod: 502, mensagem: "Erro ao atualizar no banco de dados!" });
                throw new Error(erro);
            }

            res.status(201).send({ status: "Sucesso", mensagem: "Dados atualizados!" });
        });
    } catch ({ message }) {
        const { cod, mensagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", mensagem });    
    }
}
