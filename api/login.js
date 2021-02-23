const { jwt } = require('../server/jwt.js');
require('dotenv/config');

module.exports = (req, res) => {
    const { usuario, senha } = req.body;

    if(usuario === process.env.USUARIO && senha === process.env.SENHA ) {
        const id = 1;

        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: (60 * 60 * 1)
        });

        res.json({ auth: true, token: token });
    } else {
        res.status(500).json({message: 'Login inválido!'});
    }

}
