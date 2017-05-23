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
                this.secret = jwt.sign( this, settings.secret);
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
