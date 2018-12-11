import suggestionBoxConstants from '../actions/actions.suggestionBox';

// const initialState = {
//     // use this attribute for authorization
//     isUserAuthenticated: false,
//     fetching: true,
//     // dont show users object
//     fetched: false, 
//     // Holds current users information
//     currentUser: null,
//     ticker: null,
//     // need to pass in list of tickers from IEX for suggestion box
//     suggestions: [], 
//     // check if the stocks from IEX were properly loaded
//     stocksFound: false,
//     // check which suggestion is activated by the user
//     activeSuggestion: 0,
//     // The suggestions that match the user's input
//     filteredSuggestions: [],
//     // Whether or not the suggestion list is shown
//     showSuggestions: false,
//     // What the user has entered
//     userInput: "",
//     // Redirect if the user has entered a stock
//     redirect: false
// }

const initialState = {}
const suggestionBoxReducer = function(state = initialState, action){
    switch(action.type){
        case suggestionBoxConstants.UPDATE_SUGGESSTION_BOX_INPUT: {
            console.log(action);
            return {
                ...state,
                ...action.payload.userInput,
                ...action.payload.filteredSuggestions,
                showSuggestions: true,
                activeSuggestion: 0

            }
        }

        case suggestionBoxConstants.RESET_INPUT: {
            return {
                ...state,
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: ""
            }
        }

        case suggestionBoxConstants.UPDATE_TICKER: {
            return {
                ...state,
                ...action.payload
            }
        }

        case suggestionBoxConstants.INCREMENT_ACTIVE_SUGGESTION: {
            return {
                ...state,
                activeSuggestion: state.activeSuggestion + 1
            }
        }

        case suggestionBoxConstants.DECREMENT_ACTIVE_SUGGESTION: {
            return {
                ...state,
                activeSuggestion: state.activeSuggestion - 1
            }
        }


        default:
        return state;
    }
            
}
     