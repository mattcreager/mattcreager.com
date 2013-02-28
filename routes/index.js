
/**
 * Module dependencies.
 */

var nodemailer = require('nodemailer');

/*
 * Routes Module
 */

module.exports = function (app) {

    /**
     * Parse current page from route
     */
    app.get('*', function (req, res, next) {
        var route              = req.url.match(/^\/([^\?]*)/)[1] || 'home';
        app.locals.page        = {};
        app.locals.page[route] = true;
        next();
    });

    /**
     * Render home
     */
    app.get('/', function (req, res) {
        res.render('index');
    });

    /**
     * Render resume
     */
    app.get('/resume', function (req, res) {
        res.render('resume');
    });

    /**
     * Render contact
     */
    app.get('/contact', function (req, res) {
        res.render('contact');
    });

    /**
     * Contact submission handler
     */
    app.post('/contact/submit', function (req, res) {

        // If no email was provided, return an error
        if ( req.body.email === '' ) {

            return res.json(400, { error: 'email address please!' });

        } else {
            
            res.json(200);

            // Setup e-mail data
            var mailOptions = {
                from: req.body.email, // sender address
                to: "matt@symptom6.com", // list of receivers
                subject: "Contact Form Submission: mattcreager.com", // Subject line
                text: req.body.message
            }

            // We're using the 'sendmail' transport
            var transport = nodemailer.createTransport("sendmail");

            // Send mail with defined transport object
            transport.sendMail(mailOptions, function (error, response) {
                transport.close();
            });
        }

    });

}