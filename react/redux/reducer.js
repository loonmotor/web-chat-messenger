const
    user = (state = {}, action) => {
        switch (action.type) {
            case 'SIGN_IN_USER':
                return {...state, ...action.payload};
        }
        return state;
    }
    , users = (state = {idleUsers: [], activeUsers: []}, action) => {
        switch (action.type) {
            case 'CHAT_SERVER_CONNECTED':
                return action.payload;
            case 'UPDATE_USERS':
                return action.payload;
        }
        return state;
    }
    , muted = (state = {}, action) => {
        switch (action.type) {
            case 'TOGGLE_MUTE':
                const userMuteState = state[action.payload];
                return {...state, [action.payload]: !userMuteState};
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
            case 'INCOMING_MESSAGES':
                return [...action.payload, ...state];
        }
        return state;
    };

export {user, users, muted, chatServer, chatInput, socket, messages};
