import  userConstants  from './actions.users';

//check if the user is in session
function getUserSession(dispatch) {

    //let the app know that we are getting the session
    dispatch({ type: userConstants.SESSION_REQUEST });

    //check if the user is cached
    fetch("api/auth")
            .then((userData) => {
                //save user to state or... SESSION! :D
                dispatch({type: userConstants.SESSION_ACTIVE, payload: userData});
            })
            .catch((error) => {
                //if something went wrong
                dispatch({type: userConstants.SESSION_NOT_FOUND, payload: error})
            })
}

//Handle user signins.
function loginUser(dispatch) {

    //let the app know that we are attempting to log the user in
    dispatch({ type: userConstants.LOGIN_REQUEST });

    //check if the user is cached
    fetch("api/auth")
            .then((userData) => {
                //save user to state or... SESSION! :D
                dispatch({type: userConstants.LOGIN_SUCCESS, payload: userData});
            })
            .catch((error) => {
                //if something went wrong
                dispatch({type: userConstants.LOGIN_FAILURE, payload: error})
            })
}

//handle new user registration
function registerUser(dispatch){

    //let the app know that we are attempting to signup the user
    dispatch({ type: userConstants.REGISTER_REQUEST });

    //check if the user is cached
    fetch("api/auth")
            .then((userData) => {
                //save user to state or... SESSION! :D
                dispatch({type: userConstants.REGISTER_SUCCESS, payload: userData});
            })
            .catch((error) => {
                //if something went wrong
                dispatch({type: userConstants.REGISTER_FAILURE, payload: error})
            })
}

//handle user logout
function logoutUser(dispatch){

    //let the app know we are trying to log the use in
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    
    //Commence logout
    fetch("/logout")
        .then(response => {
            dispatch({ type: userConstants.LOGOUT_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: userConstants.LOGUT_FAILURE });
        })
}


    
