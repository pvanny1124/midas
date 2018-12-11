import { suggestionBoxConstants } from '../actions/actions.suggestionBox';

const initialState = {
    // Whether or not the suggestion list is shown
    activeSuggestion: 0,

}

const activeSuggestionReducer = function(state = 0, action){
    switch(action.type){
        case suggestionBoxConstants.INCREMENT_ACTIVE_SUGGESTION: {
            return state.activeSuggestion + 1;
        }

        case suggestionBoxConstants.DECREMENT_ACTIVE_SUGGESTION: {
            return state.activeSuggestion - 1;
        }

        default:
        return state;
    }
            
}

export default activeSuggestionReducer;
     