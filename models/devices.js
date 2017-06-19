var helpers = require('../app/_helpers');
var jwt = require('jsonwebtoken');
var settings = require('../config/settings');

module.exports = function (orm, db) {
    var Device = db.define('device', {
        id: { type: 'text', key: true, required: true },
        address: String,
        secret: String,
        status: Number,
        about: String,
        created: { type: 'date' }
    }, {
        hooks: {
            beforeValidation: function () {
                tsmp = new Date();
                raw_id = this.address + this.about + tsmp;
                this.id = helpers.hashCode(raw_id);
                this.created = new Date();
                this.status = 0;
                current_Time = Date.now() / 1000 | 0
                jwt_data = {
                    iat: current_Time,
                    sub: this.id,
                    exp: current_Time + 2592000
                }
                this.secret = jwt.sign( jwt_data, settings.secret);
            }
        },
        methods: {
            resetToken: function () {
                tsmp = new Date();
                raw_id = this.address + this.about + tsmp;
                this.id = helpers.hashCode(raw_id);
                this.secret = jwt.sign( this, settings.secret);
            }
        }
    });


};
