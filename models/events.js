var helpers = require('../app/_helpers');

module.exports = function (orm, db) {
    var Event = db.define('event', {
        id: { type: 'text', key: true, required: true },
        user_id: String,
        created: { type: 'date' },
        name: String,
        picture: String,
        device_id: String,
        similarity: Number,
        event_picture: String,
        type: Number,
        valid: Number
    },
    {
        hooks: {
            beforeValidation: function () {
                tsmp = new Date();
                raw_id = this.user_id + tsmp;
                this.id = helpers.hashCode(raw_id); 
            }
        }
    });

    //Event.hasOne("device", db.models.Device, {required: true, autoFetch: true});

};



