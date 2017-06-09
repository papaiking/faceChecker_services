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
    Linkedface_OAUTH    : 'https://api.linkedface.com/oauth', 
    app_identity: {
        app_id:"73705ee75cbdf46f7d68539e7523e879", 
        secret:"RC3VZ53O5DJH3V687WCKOXZ81XQF80RY"
    }
};

module.exports = settings;
