const
    signInUser = (user) => ({
        type: 'SIGN_IN_USER',
        payload: user
    })
    , updateUsers = (users) => ({
        type: 'UPDATE_USERS',
        payload: users
    });

export {signInUser, updateUsers};