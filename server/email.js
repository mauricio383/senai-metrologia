const mailer = require('nodemailer');
require('dotenv/config');

module.exports = (email, conteudo) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.E_USER,
            pass: process.env.E_PASS
        }
    })
    
    const mail = {
        from: 'SENAI <>',
        to: email,
        subject: conteudo.titulo,
        html: (`<p>${conteudo.msg}</p>`)
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}
