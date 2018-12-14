import { loginConstants } from '../../actions/actions.login';
import { userConstants } from '../../actions/actions.users'

const initialState = {
    email: null,
    password: null,
    doesEmailExist: false
}

const loginReducer = function(state = initialState, action){
    switch(action.type){
        case loginConstants.EMAIL_EXISTS: {
            return {
                ...state,
                doesEmailExist: true
            };
            break;
        }

        case loginConstants.EMAIL_NOT_FOUND: {
            return {
                ...state,
                doesEmailExist: false
            };
            break;
        }

        case loginConstants.UPDATE_EMAIL_INPUT: {
            return {
                ...state,
                email: action.payload
            };
            break;
        }

        case loginConstants.UPDATE_PASSWORD_INPUT: {
            return {
                ...state,
                password: action.payload
            };
            break;
        }

        case userConstants.LOGIN_SUCCESS: {
            return initialState;
            break;
        }
   
        default:
        return state;
    }
}

export default loginReducer