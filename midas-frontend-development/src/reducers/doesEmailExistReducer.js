import { emailConstants } from '../actions/actions.email';

const doesEmailExistReducer = function(state = false, action){
    switch(action.types){
        case emailConstants.EMAIL_EXISTS: {
            return true;
            break;
        }

        case emailConstants.EMAIL_NOT_FOUND: {
            return false;
            break;
        }
    }
}