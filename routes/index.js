var nodemailer = require('nodemailer');

module.exports = function (app) {

    app.get('*', function (req, res, next) {
        var route              = req.url.match(/^\/([^\?]*)/)[1] || 'home';
        app.locals.page        = {};
        app.locals.page[route] = true;
        next();
    });

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/resume', function (req, res) {
        res.render('resume');
    });

    app.get('/contact', function (req, res) {
        res.render('contact');
    });

    app.post('/contact/submit', function (req, res) {

        if ( req.body.email === '' ) {
            return res.json(400, { error: 'email address please!' });
        } else {
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: req.body.email, // sender address
                to: "matt@symptom6.com", // list of receivers
                subject: "Contact Form Submission: mattcreager.com", // Subject line
                text: req.body.message
            }

            var transport = nodemailer.createTransport("sendmail");

            // send mail with defined transport object
            transport.sendMail(mailOptions, transport.close);
        }

    });

}