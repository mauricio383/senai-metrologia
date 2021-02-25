const dbConn = require('../server/db.js');
const emailFunction = require("../server/email.js");

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

            const conteudo = {
                titulo: "Confirmação de cadastro.",
                msg: `
                    Olá ${nome}, estamos enviando este e-mail para confirmar o cadastro do seu e-mail.<br/>
                    Por favor, nos marque como "Não spam".
                `
            };

            emailFunction(email,  conteudo);
        });
    } catch ({ message }) {
        const { cod, mensagem } = JSON.parse(message);
        res.status(cod).send({ status: "Falha", mensagem });    
    }
}
