
module.exports = function (orm, db) {
    var Device = db.define('device', {
        id: { type: 'text', key: true, required: true },
        address: String,
        secret: String,
        status: Number,
        about: String,
        created: { type: 'date' }
    }, {
        autoFetch : true,
        cache : false,
        methods: {

            generate: function() {
            }    
        }
    });


};
