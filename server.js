const
    http = require('http')
    , ecstatic = require('ecstatic')
    , server = http.createServer(ecstatic({root: `${__dirname}/public`}))
    , io = require('socket.io')(server)
    , Redis = require('redis')
    , redis = Redis.createClient();

io.on('connection', (socket) => {
    socket.on('signInUser', (user, callback) => {
        const
            {email, id, name, picture: {data: {url: pictureUrl}}} = user;
        socket.userId = 'user:' + id;
        // console.log(socket.userId);
        redis.multi()
            .set('user:' + id, JSON.stringify({
                email,
                id,
                name,
                pictureUrl
            }))
            .keys('user:*')
            .exec((err, replies) => {
                if (err) {
                    return callback(false);
                }
                redis.mget(replies[1], (error, users) => {
                    if (error) {
                        return callback(false);
                    }
                    
                    users = users.map(user => JSON.parse(user));
                    socket.broadcast.emit('updateUsers', users);
                    return callback(users);
                });
            });
    });
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log(socket.userId);
        console.log('disconnected');
        if (socket.userId) {
            redis.del(socket.userId);
        }
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

