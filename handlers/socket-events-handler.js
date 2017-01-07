const
    Redis = require('ioredis')
    , redis = new Redis()
    , ms = require('ms')
    , async = require('async')
    , uniqid = require('uniqid')
    , moment = require('moment')
    , argv = require('minimist')(process.argv.slice(2))
    , db = require('mongojs')(argv.mongoUrl || 'mongodb://127.0.0.1:27017/chat', ['chat'])
    , socketEventsHandler = io => socket => ({
        signInUser: (user, callback) => {
            const
                {email, id, name, picture: {data: {url: pictureUrl}}} = user;
            socket.user = user;
            redis.multi()
                .set(`user:${id}`, JSON.stringify({email, id, name, pictureUrl}))
                .zadd('users', 0, `user:${id}`)
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
                            io.emit('updateUsers', {
                                activeUsers,
                                idleUsers
                            });
                            io.emit('message', {
                                user: {
                                    name: 'Chatbot'
                                },
                                content: `${name} has signed in`,
                                id: uniqid(),
                                sent: moment().toISOString()
                            });
                        });
                    });
                    return null;
                })
                .then(() => {
                    db.chat.find({}, (err, messages) => {
                        io.emit('messages', messages);
                    })
                });
        },
        message: msg => {
            async.parallel([
                (done) => {
                    const
                        {id} = msg.user;
                    redis.multi()
                        .zadd('users', Date.now(), `user:${id}`)
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
                                    done();
                                });
                            });

                            io.emit('message', msg);
                        });
                },
                (done) => {
                    const
                        {email, id, name, picture: {data: {url: pictureUrl}}} = msg.user;
                    db.chat.insert({
                        user: {
                            email,
                            id,
                            name,
                            pictureUrl
                        },
                        content: msg.content,
                        sent: msg.sent,
                        id: msg.id
                    });
                    done();
                }
            ]);
        },
        disconnect: () => {
            if (socket.user) {
                const
                    {email, id, name, picture: {data: {url: pictureUrl}}} = socket.user;
                redis.multi()
                    .del(`user:${id}`)
                    .zrem('users', `user:${id}`)
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
                                io.emit('updateUsers', {
                                    activeUsers,
                                    idleUsers
                                });
                                io.emit('message', {
                                    user: {
                                        name: 'Chatbot'
                                    },
                                    content: `${name} has signed out`,
                                    id: uniqid(),
                                    sent: moment().toISOString()
                                });
                            });
                        });
                    });
            }
        }
    });

redis.flushdb();
db.chat.remove({});

module.exports = socketEventsHandler;