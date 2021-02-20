const mailer = require('nodemailer');

module.exports = (email, nome) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    })
    
    const mail = {
        from: 'SENAI <>',
        to: email,
        subject: 'Alerta temperatura',
        text: `Olá ${nome}, a temperatura subiu`,
        html: '<a href="www.google.com">Link</a>'
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
