import io from 'socket.io-client';

const
    socket = io('http://localhost:3000')
    , webSocket = store => next => action => {

        switch (action.type) {
            case 'SIGN_IN_USER':
                store.dispatch({type: 'CONNECTING_CHAT_SERVER'});
                return socket.emit('signInUser', action.payload, (response) => {
                    if (response) {
                        setTimeout(() => { // 3 seconds delay for demonstration, as connection within localhost is fast
                            store.dispatch({
                                type: 'CHAT_SERVER_CONNECTED',
                                payload: response
                            });
                            next(action);
                        }, 3000);
                    } else {
                        store.dispatch({type: 'ERROR_CONNECTING_CHAT_SERVER'});
                    }
                });
        }
        return next(action);
        
    };

export {webSocket};

