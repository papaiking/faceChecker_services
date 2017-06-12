var path = require('path');

var settings = {
    path        : path.normalize(path.join(__dirname, '..')),
    port        : process.env.NODE_PORT || 9100,
    database    : {
        protocol: "mysql",
        query   : { pool: true },
        host    : "127.0.0.1",
        database: "facechecker",
        user    : "facechecker",
        password: "lot123"
    },
    secret      : 'ANY_STRING_HERE',
    Linkedface_OAUTH    : 'https://api.linkedface.com/oauth/app/token',
    Linkedface_USER_INFO:    'https://api.linkedface.com/oauth/app/user_info/{0}', 
    app_identity: {
        // Connect to application: SURVEILLANCE CAMERA
        app_id:"0b3422a7a3c9c48f21ff165abfdafe44", 
        secret:"AHHBOVBE21Q1TEP4JTJMH9XRBC3TAVSH"
    }
};

module.exports = settings;
