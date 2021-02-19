const medidasPost = require('../api/medidas_post.js');
const medidasGet = require('../api/medidas_get.js');

module.exports = (app) => {
    app.post('/medidas', medidasPost);
    app.get('/medidas', medidasGet);
};
