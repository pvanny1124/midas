import { stocksConstants } from '../actions/actions.stocks';
// import { initialState } from '../index';

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

const stocksReducer = function(state = initialState, action){

    switch(action.type){
        case stocksConstants.STOCKS_LOADED: {
            return {
                    ...state,
                    ...action.payload,
                    stocksFound: true
            }
            break;
        }

        case stocksConstants.STOCKS_NOT_FOUND: {
            return {
                ...state,
                stocksFound: false
            }
        }
        
        default:
        return state;
    }
};

export default stocksReducer;