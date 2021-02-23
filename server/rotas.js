// Medidas
const medidasPost = require('../api/medidas_post.js');
const medidasGet = require('../api/medidas_get.js');
// E-mails.
const emailsPost = require('../api/emails_post.js');
const emailsGet = require('../api/emails_get.js');
const emailsPut = require('../api/emails_put.js');
const emailsDelete = require('../api/emails_delete.js');
// Login
const login = require('../api/login.js');
const validarToken = require('../api/validarToken.js');
const { verifyJWT } = require('./jwt.js');

module.exports = (app) => {
    // Medidas.
    app.post('/medidas', medidasPost);
    app.get('/medidas', medidasGet);
    // E-mails.
    app.post('/emails', verifyJWT, emailsPost);
    app.get('/emails', verifyJWT, emailsGet);
    app.put('/emails/:id', verifyJWT, emailsPut);
    app.delete('/emails/:id', verifyJWT, emailsDelete);
    // Login.
    app.post('/login', login);
    // Validar Token.
    app.post('/validarToken', verifyJWT, validarToken);
};
