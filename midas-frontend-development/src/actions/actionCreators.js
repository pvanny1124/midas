import  { userConstants } from './actions.users';
import { stocksConstants } from './actions.stocks';
import { suggestionBoxConstants } from './actions.suggestionBox';
//check if the user is in session
export function getUserSession() {

    //return for thunk purposes
    return dispatch => {
          //let the app know that we are getting the session
          dispatch({ type: userConstants.SESSION_REQUEST });

           //check if the user is cached
            fetch("/api/auth")
                .then((response) => {
                    return response.json();
                })
                .then(user => {
                    //save user to state or... SESSION! :D
                    console.log("%cUSER IS IN SESSION", "color: green")
                    dispatch({type: userConstants.SESSION_ACTIVE, payload: user});
                })
                .catch((error) => {
                    //if something went wrong
                    console.log("%cUSER IS NOT IN SESSION", "color: green")
                    dispatch({type: userConstants.SESSION_NOT_FOUND, payload: error})
                })
        }
 
}

//Handle user signins.
export function loginUser() {

    return dispatch => {
        //let the app know that we are attempting to log the user in
        dispatch({ type: userConstants.LOGIN_REQUEST });

        //check if the user is cached
        fetch("api/auth")
                .then((userData) => {
                    //save user to state or... SESSION! :D
                    console.log("%cUSER IS LOGGED IN", "color: green")
                    dispatch({type: userConstants.LOGIN_SUCCESS, payload: userData});
                })
                .catch((error) => {
                    //if something went wrong
                    console.log("%cUSER COULD NOT LOGIN", "color: green")
                    dispatch({type: userConstants.LOGIN_FAILURE, payload: error})
                })
        }
    
}

//handle new user registration
export function registerUser(){

    return dispatch => {
        //let the app know that we are attempting to signup the user
        dispatch({ type: userConstants.REGISTER_REQUEST });

        //check if the user is cached
        fetch("api/auth")
                .then((userData) => {
                    //save user to state or... SESSION! :D
                    console.log("%cUSER IS NOW REGISTERED", "color: green")
                    dispatch({type: userConstants.REGISTER_SUCCESS, payload: userData});
                })
                .catch((error) => {
                    //if something went wrong
                    console.log("%cUSER COULD NOT REGISTER", "color: green")
                    dispatch({type: userConstants.REGISTER_FAILURE, payload: error})
                })
    }
}

//handle user logout
export function logoutUser(){

    return dispatch => {

        //let the app know we are trying to log the use in
        dispatch({ type: userConstants.LOGOUT_REQUEST });
        
        //Commence logout
        fetch("/logout")
            .then(response => {
                console.log("%cUSER COULD LOGOUT", "color: green")
                dispatch({ type: userConstants.LOGOUT_SUCCESS })
            })
            .catch(error => {
                console.log("%cUSER COULD NOT LOGOUT", "color: green")
                dispatch({ type: userConstants.LOGUT_FAILURE });
            })
    }
}

//Get all the available stocks from the IEX API
export function getAllSymbols(){

    return dispatch => {
        fetch("https://api.iextrading.com/1.0/ref-data/symbols")
                .then(response => {
                        return response.json();
                })
                .then(data => {
                    console.log("%cALL STOCKS HAVE BEEN LOADED FROM IEX", "color: green");
                        dispatch({ type: stocksConstants.STOCKS_LOADED, payload: data })
                })
                .catch(error => {
                    console.log("%cALL STOCKS HAVE BEEN LOADED FROM IEX", "color: green");
                    dispatch({ type: stocksConstants.STOCKS_NOT_FOUND, payload: error })
                });
    }

}


//SUGGESSTION BOXES

// Update the user input and filtered suggestions, reset the active
// suggestion and make sure the suggestions are shown
export function updateSuggestionBoxUserInput(input_value, filteredSuggestions){
    return dispatch => {
        dispatch({ type: suggestionBoxConstants.UPDATE_SUGGESTION_BOX_INPUT, 
                   payload: {
                       userInput: input_value,
                       filteredSuggestions: filteredSuggestions
                   }
        })
    }
}

export function resetInput(){
    return dispatch => {
        dispatch({ type: suggestionBoxConstants.RESET_INPUT })
    }
}

export function updateTicker(ticker){
    return dispatch => {
        dispatch({ type: suggestionBoxConstants.UPDATE_TICKER, payload: ticker })
    }
}

export function incrementActiveSuggestion(){
    return dispatch => {
        dispatch({ type: suggestionBoxConstants.INCREMENT_ACTIVE_SUGGESTION })
    }
}

export function decrementActiveSuggestion(){
    return dispatch => {
        dispatch({ type: suggestionBoxConstants.DECREMENT_ACTIVE_SUGGESTION })
    }
}
    
