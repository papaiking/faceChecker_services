//var helpers = require('./_helpers');
//var jwt = require('jsonwebtoken');
//var settings = require('../config/settings');

module.exports = {
    // Service to insert new device into database
    create: function (req, res, next) {
        
        var device = req.body;
        req.models.device.create( device, function (err, obj) {
            if (err) throw err;
        
            console.log('Device created successfully');
            res.json({ status: 1, message: 'OK', device: obj});            
        });
    },
    
    // Get list of devices, with :limit devices
    list: function(req, res, next) {

        console.log("Start geting devices");
        limit = parseInt(req.params.limit);
        offset = parseInt(req.params.offset);

        req.models.device.find({}, ['created', 'Z'], {limit: limit}, {offset: offset},  function(err, devices) {
            if (err) throw err;

            //console.log("Event list: ", devices);
            res.json(devices);
        });
    },
    
    // Get access token for device specify by device id
    deviceInfo: function (req, res) {
        var id = req.params.id;

        req.models.device.get(id, function (err, device){
            if (err) throw err;

            //console.log('Token: ', token);
            res.json({status: 1, message: 'OK', device: device});
        })
    },

    // Update device information
    updateDeviceInfo: function (req, res) {
        var update = req.body;

        var id = update.id;
        req.models.device.get(id, function (err, device){
            if (err) throw err;

            if (update.address)
                device.address = update.address
            if (update.about)
                device.about = update.about
           
            device.save(function (err) {
                if (err)    throw err;

                console.log("Update device successful!");
                res.json({status: 1, message: 'OK', device: device});
            });
        })
    },

    // Delete device specified by device id 
    deleteDevice: function (req, res) {
        var id = req.params.id;

        req.models.device.get(id, function (err, device){
            if (err) throw err;

            device.remove(function (err) {
                if (err) throw err;

                console.log("Deleted device!");
                res.json({status: 1, message: 'Deleted', device_id: device.id});
            });            
        })
    } 

};
