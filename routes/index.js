// Comments Please
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
            res.send('blah');
        }

    });

}