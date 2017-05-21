
module.exports = {
    formatErrors: function(errorsIn) {
        var errors = {};
        var a, e;

        for(a = 0; a < errorsIn.length; a++) {
            e = errorsIn[a];

            errors[e.property] = errors[e.property] || [];
            errors[e.property].push(e.msg);
        }
        return errors;
    },

    hashCode: function(instr) {
        var crypto = require('crypto');
        var md5sum = crypto.createHash('md5');
        return md5sum.update(instr).digest('hex');
    },

     // Allow CORS for APIs
    CORS: function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    }

};
