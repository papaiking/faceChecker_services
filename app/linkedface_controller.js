var settings = require('../config/settings');
var oauth = require('./oauth');


// Get user profile from Linkedface
var getUserProfile = function (user_id, access_token, cb) {
    console.log('Starting get user profile from Linkedface');

    var request = require('request');
    var options = {
        url: settings.Linkedface_USER_INFO + user_id,
        headers: {
          'Authorization': 'BEARER ' + access_token
        }
    };

    //    console.log(JSON.stringify(options) );
    request.get( options, function(err, response, body) {
        if (err || response.statusCode != 200) {
            console.log('Error on request: ', err);
            cb( {status: 0, message: 'Error on get Linkedface access token'} );
        }
        //console.log(body)
        profile = JSON.parse(body);
        cb( profile );
    });
   
}

module.exports = {

    // Function to get user profile information from Linkedface
    user_profile: function( req, res, next ) {
        //console.log('Access token: ' + req.app.token);
        var id = req.params.id;

        access_token = req.app.token;
        if (!access_token) {
            oauth.request_linkedface_token( function (res_token) {
                if (res_token.status == 0) {
                    res.json( res_token )
                } else {
                    access_token = res_token.token;
                    // Get profile
                    getUserProfile ( id, access_token, function( profile ) {
                        res.json( profile )
                    });

                }
            })
        } else {

            // Get profile
            getUserProfile ( id, access_token, function( profile ) {
                res.json( profile )
            });
        }
    }

};

