// Adicionando o pacote que resolver o problema de cors da API.
const cors = require('cors');

module.exports = (app) => {
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
}
