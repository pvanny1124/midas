import  { userConstants } from './actions.users';
import { stocksConstants } from './actions.stocks';
import { suggestionBoxConstants } from './actions.suggestionBox';
import { emailConstants } from './actions.email';

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
        console.log("%cUPDATING BOX INPUT", "color: green");
        console.log("%cINPUT VALUE: ", "color: purple");
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
        dispatch({ type: suggestionBoxConstants.DECREMENT_ACTIVE_SUGGESTION });
    }
}
    

//Email action creators

export function updateEmailInput(email_value){
    return dispatch => {
        dispatch({ type: emailConstants.UPDATE_EMAIL_INPUT, payload: email_value });
    }
}

export function updatePasswordInput(password_value){
    return dispatch => {
        dispatch({ type: emailConstants.UPDATE_PASSWORD_INPUT, payload: password_value });
    }
}

export function login(email, password){
    console.log("%cEMAIL:", "color: blue");
    console.log("%c" + email, "color: green")
    console.log("%cPASSWORD:", "color: blue");
    console.log("%c" + password, "color: green")
    return dispatch => {
        fetch("/login", {
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(user => {
            console.log("%cLogin-user-debug", "color: purple");
            console.log({user});

            if(user){
                //save user data in state
                dispatch({ type: userConstants.LOGIN_SUCCESS, payload: user });
                this.props.history.push("/");
            }
        })
        .catch(error => {
            dispatch({ type: userConstants.LOGIN_FAILURE, payload: error })
        })
    }
}



/* --------------------------------------------------------------------
    Signup creators
    
-----------------------------------------------------------------------*/

export function signup(){
    return dispatch => {
          //make request to backend api to signup user
          fetch("/signup", {
            method: "post",
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                firstName: this.state.firstName, 
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                age: this.state.age,
                country: this.state.country,
                cash: this.state.cash,
                portfolio: this.state.portfolio,
                portfolioValue: this.state.portfolioValue
            })
          })
          .then((response) => {
                console.log(response);
                return response.json();
          })

          .then((message) => {
              console.log(message);

              //authenticate user in the backend to save them in session
              if(message.userCreated){
                    fetch("/login", {
                        method: "post",
                        headers: new Headers({
                            "Content-Type": "application/json"
                        }),
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password
                        })
                    })
                    .then(response => {
                        console.log(response)
                        if(response === 200){
                            console.log("successfully authenticated");
                        }
                    })
                    .then(() => {
                        this.props.getUser(message.user);
                        this.props.history.push("/");
                    })
                    
              } 
          })
          .catch((err) => {
              this.setState({
                  displayError: true
              })
              console.log(err);
          })
    }
}
