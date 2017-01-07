const
    Redis = require('ioredis')
    , redis = new Redis()
    , ms = require('ms')
    , async = require('async')
    , socketEventsHandler = io => socket => ({
        signInUser: (user, callback) => {
            async.series([
                (next) => {
                    const
                        {email, id, name, picture: {data: {url: pictureUrl}}} = user;
                    socket.user = user;
                    redis.multi()
                        .set('user:' + id, JSON.stringify({email, id, name, pictureUrl}))
                        .zadd('users', 0, 'user:' + id)
                        .zrevrangebyscore('users', Date.now(), Date.now() - ms('60s'))
                        .zrevrangebyscore('users', Date.now() - ms('60s') - 1, 0)
                        .exec()
                        .then(replies => {

                            const
                                activeUserKeys = replies[2][1].length > 0 && replies[2][1] || ''
                                , idleUserKeys = replies[3][1].length > 0 && replies[3][1] || '';

                            redis.mget(activeUserKeys, (err, activeUsers) => {
                                redis.mget(idleUserKeys, (err, idleUsers) => {
                                    if (activeUsers[0] === null) activeUsers = [];
                                    if (idleUsers[0] === null) idleUsers = [];
                                    activeUsers = activeUsers.map(user => JSON.parse(user));
                                    idleUsers = idleUsers.map(user => JSON.parse(user));
                                    callback({
                                        activeUsers,
                                        idleUsers
                                    });
                                    socket.broadcast.emit('updateUsers', {
                                        activeUsers,
                                        idleUsers
                                    });
                                    next();
                                });
                            });
                        });
                }
            ]);
        },
        message: msg => {
            const
                {id} = msg.user;
            console.log(id);
            redis.multi()
                .zadd('users', Date.now(), 'user:' + id)
                .zrevrangebyscore('users', Date.now(), Date.now() - ms('60s'))
                .zrevrangebyscore('users', Date.now() - ms('60s') - 1, 0)
                .exec()
                .then(replies => {
                    
                    const
                        activeUserKeys = replies[1][1].length > 0 && replies[1][1] || ''
                        , idleUserKeys = replies[2][1].length > 0 && replies[2][1] || '';

                    redis.mget(activeUserKeys, (err, activeUsers) => {
                        redis.mget(idleUserKeys, (err, idleUsers) => {
                            if (activeUsers[0] === null) activeUsers = [];
                            if (idleUsers[0] === null) idleUsers = [];
                            activeUsers = activeUsers.map(user => JSON.parse(user));
                            idleUsers = idleUsers.map(user => JSON.parse(user));
                            io.emit('updateUsers', {
                                activeUsers,
                                idleUsers
                            });
                        });
                    });

                    io.emit('message', msg);
                });
        },
        disconnect: () => {
            if (socket.user) {
                const
                    {email, id, name, picture: {data: {url: pictureUrl}}} = socket.user;
                console.log('user:' + id);
                redis.multi()
                    .del('user:' + id)
                    .zrem('users', 'user:' + id)
                    .zrevrangebyscore('users', Date.now(), Date.now() - ms('60s'))
                    .zrevrangebyscore('users', Date.now() - ms('60s') - 1, 0)
                    .exec()
                    .then(replies => {
                        console.log('no problem');
                        const
                            activeUserKeys = replies[2][1].length > 0 && replies[2][1] || ''
                            , idleUserKeys = replies[3][1].length > 0 && replies[3][1] || '';

                        redis.mget(activeUserKeys, (err, activeUsers) => {
                            redis.mget(idleUserKeys, (err, idleUsers) => {
                                if (activeUsers[0] === null) activeUsers = [];
                                if (idleUsers[0] === null) idleUsers = [];
                                activeUsers = activeUsers.map(user => JSON.parse(user));
                                idleUsers = idleUsers.map(user => JSON.parse(user));
                                io.emit('updateUsers', {
                                    activeUsers,
                                    idleUsers
                                });
                            });
                        });

                    });
            }
        }
    });

module.exports = socketEventsHandler;