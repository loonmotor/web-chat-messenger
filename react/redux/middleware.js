import moment from 'moment';
import uniqid from 'uniqid';
import {notify} from 'react-notify-toast';

const
    webSocket = store => next => action => {
        const
            {dispatch} = store
            , {socket, user} = store.getState();
        switch (action.type) {
            case 'SIGN_IN_USER':
                dispatch({type: 'CONNECTING_CHAT_SERVER'});
                return socket.emit('signInUser', action.payload, (response) => {
                    console.log(response);
                    if (response) {
                        setTimeout(() => { // 1 second delay for demonstration, as connection within localhost is fast
                            dispatch({
                                type: 'CHAT_SERVER_CONNECTED',
                                payload: response
                            });
                            next(action);
                        }, 1000);
                    } else {
                        dispatch({type: 'ERROR_CONNECTING_CHAT_SERVER'});
                    }
                })
            case 'SUBMIT_MESSAGE':
                return socket.emit('message', {
                    user,
                    content: action.payload,
                    sent: moment(),
                    id: uniqid()
                });
        }
        return next(action);
        
    }
    , chatMessageScroll = store => next => action => {
        switch (action.type) {
            case 'INCOMING_MESSAGE':
                if (Math.abs($('.chat-messages')[0].scrollHeight - $('.chat-messages').scrollTop() - $('.chat-messages').outerHeight()) < 2) {
                    $('.chat-messages').animate({
                        scrollTop: $('.chat-messages')[0].scrollHeight
                    }, 400, 'linear');
                } else {
                    notify.show('You have unread messages');
                }
        }
        return next(action);
    };

export {webSocket, chatMessageScroll};

