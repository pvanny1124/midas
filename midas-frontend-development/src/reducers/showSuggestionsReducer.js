import { suggestionBoxConstants } from '../actions/actions.suggestionBox';

const initialState = {
    // Whether or not the suggestion list is shown
    showSuggestions: false,

}

const showSuggestionsReducer = function(state = false, action){
    switch(action.type){
        case suggestionBoxConstants.UPDATE_SUGGESTION_BOX_INPUT: {
            return true;
            break;
        
        }

        case suggestionBoxConstants.RESET_INPUT: {
            return false;
            break;
        }

        default:
        return state;
    }
            
}

export default showSuggestionsReducer;
     