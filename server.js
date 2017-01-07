const
    http = require('http')
    , ecstatic = require('ecstatic')
    , server = http.createServer(ecstatic({root: `${__dirname}/public`}))
    , io = require('socket.io')(server)
    , socketEventsHandler = require('./handlers/socket-events-handler')
    , argv = require('minimist')(process.argv.slice(2));

io.on('connection', (socket) => {

    const handlers = socketEventsHandler(io)(socket);

    socket.on('signInUser', handlers.signInUser);

    socket.on('message', handlers.message);

    socket.on('disconnect', handlers.disconnect);

});

server.listen(argv.port || 3000, () => {
    console.log(`Server listening on port ${argv.port || 3000}`);
});

