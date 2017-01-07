const
    signInUser = (user) => ({
        type: 'SIGN_IN_USER',
        payload: user
    })
    , updateUsers = (users) => ({
        type: 'UPDATE_USERS',
        payload: users
    })
    , typing = (message) => ({
        type: 'TYPING',
        payload: message
    })
    , submitMessage = (message) => ({
        type: 'SUBMIT_MESSAGE',
        payload: message
    })
    , registerSocket = (socket) => ({
        type: 'REGISTER_SOCKET',
        payload: socket
    })
    , clearInput = () => ({
        type: 'CLEAR_INPUT'
    })
    , incomingMessage = (message) => ({
        type: 'INCOMING_MESSAGE',
        payload: message
    });

export {signInUser, updateUsers, typing, submitMessage, registerSocket, clearInput, incomingMessage};