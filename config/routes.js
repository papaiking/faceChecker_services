
var controllers = require('../app')

module.exports = function (app) {
    app.get( '/', controllers.home);
    
    // APIs of event for Dashbord Console
    app.get( '/event/list/:limit', controllers.events.list);

    // APIs of device for Dashbord Console
    app.get('/device/list/:limit', controllers.devices.list);
    app.post('/device/add', controllers.devices.create);
    app.get('/device/token/:id', controllers.devices.getToken);

    // API for gateway device
    app.post('/gateway/add_event', controllers.oauth.check_deviceToken, controllers.events.create);
    app.get('/gateway/linkedface_token', controllers.oauth.check_deviceToken, controllers.oauth.linkedface_token);

};
