var socketio = require('socket.io')

module.exports = function(app) {
    var io = socketio.listen(app);
	var numUsers = 0;

    //users = io.of('/users')
    io.on('connection', function(socket){
		var addedUser = false;
		
		// when the client emits 'new message', this listens and executes
		socket.on('New_Message', function (data) {
			socket.broadcast.emit('New_Message', {
				username: socket.username,
				message: data
			});
		});
		
		// when the client emits 'add user', this listens and executes
		socket.on('Add_User', function (username) {
			if (addedUser) return;
		
			// we store the username in the socket session for this client
			socket.username = username;
			++numUsers;
			addedUser = true;
			console.log('Added new user');
//			socket.emit('login', {
//		    	numUsers: numUsers
//			});
		
		});
	});

    app.all('/*', function (req, res, next) {
        console.log('assign socket');
        req.io = io;
        return next();
    });

    return io;
}
