const
    user = (state = {}, action) => {
        switch (action.type) {
            case 'SIGN_IN_USER':
                return {...state, ...action.payload};
        }
        return state;
    }
    , users = (state = {}, action) => {
        switch (action.type) {
            case 'CHAT_SERVER_CONNECTED':
            console.log(action.payload);
                return action.payload;
            case 'UPDATE_USERS':
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
    }
    , chatInput = (state = '', action) => {
        switch (action.type) {
            case 'TYPING':
                return action.payload;
            case 'CLEAR_INPUT':
                return '';
        }
        return state;
    }
    , socket = (state = {}, action) => {
        switch (action.type) {
            case 'REGISTER_SOCKET':
                return action.payload;
        }
        return state;
    }
    , messages = (state = [], action) => {
        switch (action.type) {
            case 'INCOMING_MESSAGE':
                return [...state, action.payload];
        }
        return state;
    };

export {user, users, chatServer, chatInput, socket, messages};
