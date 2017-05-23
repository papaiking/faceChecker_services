var helpers = require('./_helpers');

module.exports = {
    create: function (req, res, next) {
        console.log("Start creating new event");
        
        // This id get from request token
        var device_id = req.device.id;
        var data = req.body;
        data.device_id = device_id;

        

        req.models.event.create(data, function (err, saved_event) {
            if(err) {
                console.log('There is an error in saving event', err);
                if(Array.isArray(err)) {
                    return res.send(200, { errors: helpers.formatErrors(err) });
                } else {
                    return next(err);
                }
            }
            //console.log("new event is: ", saved_event);
            // Emit message to dashboard
            socketio = req.io;
            socketio.sockets.emit('New_Message', saved_event);

            return res.json(saved_event);
        });

    },
    
    list: function(req, res, next) {
        console.log("Start geting events");
        limit = parseInt(req.params.limit);

        req.models.event.find({}, ['created', 'Z'], {limit: limit}, function(err, events) {
            //console.log("Event list: ", events);
            res.json(events)
        });
    } 
};
