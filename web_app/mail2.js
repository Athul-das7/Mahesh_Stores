mailer = require('nodemailer');

smtpProtocol = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sender@gmail.com",
        pass: "password"
    }
});

var mailoption = {
    from: "sender@gmail.com",
    to: "receiver@gmail.com",
    subject: "Test Mail",
    html: 'Good Morning!'
}

smtpProtocol.sendMail(mailoption, function(err, response){
    if(err) {
        console.log(err);
    } 
    console.log('Message Sent' + response.message);
    smtpProtocol.close();
});