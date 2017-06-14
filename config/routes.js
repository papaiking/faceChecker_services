
var controllers = require('../app')

module.exports = function (app) {
    // Allow CORS
    app.all('/*', controllers.utils.CORS);

    // HOME - served by static folder
    app.get( '/', controllers.home);
    
    // APIs of event for Dashbord Console
    app.get( '/event/list/:limit', controllers.events.list);

    // APIs of device for Dashbord Console
    app.get('/device/list/:limit/:offset', controllers.devices.list);
    app.post('/device/add', controllers.devices.create);
    app.get('/device/info/:id', controllers.devices.deviceInfo);
    app.get('/device/delete/:id', controllers.devices.deleteDevice);
    app.post('/device/update', controllers.devices.updateDeviceInfo);

    // API for gateway device
    app.post('/gateway/add_event', controllers.oauth.check_deviceToken, controllers.events.create);
    app.get('/gateway/linkedface_token', controllers.oauth.check_deviceToken, controllers.oauth.linkedface_token);

    // APIs on user profile
    app.get('/linkedface/profile/:id', controllers.linkedface.user_profile);
};
