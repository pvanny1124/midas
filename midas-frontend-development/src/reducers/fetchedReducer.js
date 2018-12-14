
//User actions
import { userConstants } from '../actions/actions.users';
const initialState = {
    fetched: false,
}
const fetchedReducer = function(state = false, action){
    switch(action.type){

        case userConstants.LOGIN_SUCCESS: {
            return true;
            break;
        }

        case userConstants.LOGIN_FAILURE: {
            return true;
            break;
        }


        case userConstants.SESSION_ACTIVE: {
            return true;
            break;
        }

        case userConstants.SESSION_NOT_FOUND: {
            return true;
            break;
        }

        case userConstants.REGISTER_REQUEST: {
            return false;
            break;
        }

        case userConstants.REGISTER_SUCCESS: {
            return true;
            break;
        }

        case userConstants.REGISTER_FAILURE: {
            return true;
            break;
        }
        default:
        return state;

    }
}

export default fetchedReducer;