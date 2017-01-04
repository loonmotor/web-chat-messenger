const
    user = (state = {}, action) => {
        switch (action.type) {
            case 'SIGN_IN_USER':
                return {...state, ...action.payload};
        }
        return state;
    }
    , users = (state = [], action) => {
        switch (action.type) {
            case 'CHAT_SERVER_CONNECTED':
                return action.payload;
            case 'UPDATE_USERS':
                console.log(action.payload);
                return action.payload;
        }
        return state;
    }
    , chatServer = (state = '', action) => {
        switch (action.type) {
            case 'CONNECTING_CHAT_SERVER':
                return 'connecting';
            case 'CHAT_SERVER_CONNECTED':
                return 'connected';
            case 'ERROR_CONNECTING_CHAT_SERVER':
                return 'error';
        }
        return state;
    };

export {user, users, chatServer};
