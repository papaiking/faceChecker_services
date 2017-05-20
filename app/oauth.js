var settings = require('../config/settings');

module.exports = {

    // middleware to verify a token
    // This funcion intercept requests from devices to check device token
    check_deviceToken: function(req, res, next) {
        var jwt = require('jsonwebtoken');
    
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        // decode token
        if (token) {
    
            // verifies secret and checks exp
            jwt.verify(token, settings.secret, function(err, decoded) { 
                if (err) {
                    return res.json({ status: 0, message: 'Failed to authenticate token.' });      
                } else {
                    // if everything is good, save to request for use in other routes
                    req.device = decoded;      
                    next();
                }
            });
    
        } else {
    
            // if there is no token
            // return an error
            return res.status(403).send({ 
                    status: 0, 
                    message: 'No token provided.' 
            });
    
        }
    },
    
    // Function to get access token from Linkedface
    linkedface_token: function( req, res, next ) {
        console.log('Starting get access token from Linkedface');
        
        // Making post request to Linkedface to get access token
        var request = require('request');
        var postData = {
            headers: {'content-type' : 'application/json'},
            url: settings.Linkedface_OAUTH,
            body: JSON.stringify( settings.app_identity ) 
        }
        request.post( postData, function(err, response, body) {
            if (err) {
                console.log('Error on request: ', err);
                return res.json({status: 0, message: 'Error on get Linkedface access token'});
            }
            res_token = JSON.parse(body);
            res_token.status = 1;
            res_token.message = 'OK';
            //res.json( JSON.parse(body) );
            res.json( res_token )
        });
 
    }

};

