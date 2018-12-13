import { emailConstants } from '../actions/actions.email';

const loginPasswordReducer = function(state = "", action){
    switch(action.types){
        case emailConstants.UPDATE_PASSWORD_INPUT: {
            return action.payload;
            break;
        }
        
        default:
        return state;
    }
}

export default loginPasswordReducer