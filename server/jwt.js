require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

module.exports = {
    jwt,
    verifyJWT: (req, res, next) => {
        const token = req.headers['x-access-token'];
    
        if (!token) {
            return res.status(401).json({ auth: false, message: 'Você não tem o token.' });
        }
    
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
            }
    
            req.userId = decoded.id;
            next();
        });
    }
}
