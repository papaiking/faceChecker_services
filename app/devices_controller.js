var helpers = require('./_helpers');
var orm = require('orm');
var Device = require('../models/devices');
var jwt = require('jsonwebtoken');
var settings = require('../config/settings');

module.exports = {
    // Service to insert new device into database
    create: function (req, res, next) {
        
        var device = req.body;
        req.models.device.create( device, function (err, obj) {
            if (err) throw err;
        
            console.log('Device created successfully');
            res.json({ success: true, device: obj});            
        });
    },
    
    // Get list of devices, with :limit devices
    list: function(req, res, next) {

        console.log("Start geting devices");
        limit = parseInt(req.params.limit);

        req.models.device.find({}, ['created', 'Z'], {limit: limit}, function(err, devices) {
            if (err) throw err;

            //console.log("Event list: ", devices);
            res.json(devices);
        });
    },
    
    // Get access token for each device
    getToken: function (req, res) {
        var id = req.params.id;

        req.models.device.get(id, function (err, device){
            if (err) throw err;

            delete device.secret;
            var token = jwt.sign( device, settings.secret);
            //console.log('Token: ', token);
            res.json({status: 1, message: 'OK', token: token});
        })
    } 
};
