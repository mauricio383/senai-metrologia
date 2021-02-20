const dbConn = require('../server/db.js');

module.exports = (req, res) => {
    try {
        dbConn.query(`SELECT * FROM emails`, (erroDB, resDB) => {
            if (erroDB) {
                const erro = JSON.stringify({ cod: 502, mensagem: "Erro ao buscar no banco de dados!" });
                throw new Error(erro);
            }

            res.status(200).send(resDB);
        });
    } catch ({ message }) {
        const { cod, mensagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", mensagem });    
    }
}
