const
    http = require('http')
    , ecstatic = require('ecstatic')
    , server = http.createServer(ecstatic({root: `${__dirname}/public`}))
    , io = require('socket.io')(server)
    , socketEventsHandler = require('./handlers/socket-events-handler');

io.on('connection', (socket) => {

    const handlers = socketEventsHandler(io)(socket);

    socket.on('signInUser', handlers.signInUser);

    socket.on('message', handlers.message);

    socket.on('disconnect', handlers.disconnect);

});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

