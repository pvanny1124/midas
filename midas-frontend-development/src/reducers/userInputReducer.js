import { suggestionBoxConstants } from '../actions/actions.suggestionBox';

const initialState = {
    // What the user has entered
    userInput: ""
}

const userInputReducer = function(state = "", action){
    switch(action.type){
        case suggestionBoxConstants.UPDATE_SUGGESTION_BOX_INPUT: {
                return action.payload.userInput;
                break;
        }

        case suggestionBoxConstants.RESET_INPUT: {
            return "";
            break;
        }

        default:
        return state;
    }
            
}

export default userInputReducer;
     