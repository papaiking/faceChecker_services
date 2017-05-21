var path            = require('path');
var express         = require('express');
var settings        = require('./config/settings');
var environment     = require('./config/environment');
var routes          = require('./config/routes');
var models          = require('./models/');
var sockets         = require('./app/sockets');

module.exports.start = function (done) {
    var app = express.createServer();

    environment(app);
    var io = sockets(app);

    app.all('/*', function (req, res, next) {
        console.log('assign socket');
        req.io = io;
        return next();
    });


    routes(app);

    app.listen(settings.port, function () {
        //console.log( ("Listening on port " + settings.port).green );
        console.log( "Listening on port " + settings.port );

        if (done) {
            return done(null, app, server);
        }
    }).on('error', function (e) {
        if (e.code == 'EADDRINUSE') {
            console.log('Address in use. Is the server already running?'.red);
        }
        if (done) {
            return done(e);
        }
    });


}

// If someone ran: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
    module.exports.start()
}
