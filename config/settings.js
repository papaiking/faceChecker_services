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
    Linkedface_OAUTH    : 'http://118.70.151.36:9200/app/token', 
    app_identity: {
        app_id:"73705ee75cbdf46f7d68539e7523e879", 
        secret:"11HBHI3K7AJZ61VUQQ1VLP8YSDE9NPGM"
    }
};

module.exports = settings;
