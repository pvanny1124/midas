import { suggestionBoxConstants } from '../../actions/actions.suggestionBox';

const initialState = {
    // The suggestions that match the user's input
    filteredSuggestions: [],
}

const filteredSuggestionsReducer = function(state = [], action){
    switch(action.type){
        case suggestionBoxConstants.UPDATE_SUGGESTION_BOX_INPUT: {
            return action.payload.filteredSuggestions;
            break;
            
        }

        case suggestionBoxConstants.RESET_INPUT: {
            return [];
            break;
            
        }

        default:
        return state;
    }
            
}

export default filteredSuggestionsReducer;
     