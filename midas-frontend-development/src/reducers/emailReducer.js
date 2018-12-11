import { emailConstants } from '../actions/actions.email';

const emailReducer = function(state = "", action){
    switch(action.type){
        case emailConstants.UPDATE_EMAIL_INPUT: {
            return action.payload;
            break;
        }
        default:
        return state;
    }
}