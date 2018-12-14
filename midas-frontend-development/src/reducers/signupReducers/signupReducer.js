import { signupConstants } from '../../actions/actions.signup';

const initialState = {
    
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null,
        age: null,
        country: null
}

const signupReducer = function(state = initialState, action){
    switch(action.type){
        case signupConstants.UPDATE_FIRST_NAME_INPUT: {
            return {
                ...state,
                firstName: action.payload
            };
        }

        case signupConstants.UPDATE_LAST_NAME_INPUT: {
            return {
                ...state,
                lastName: action.payload
            };
        }

        case signupConstants.UPDATE_USERNAME_INPUT: {
            return {
                ...state,
                username: action.payload
            }
        }

        case signupConstants.UPDATE_PASSWORD_INPUT: {
            return {
                ...state,
                password: action.payload
            };
        }

        case signupConstants.UPDATE_EMAIL_INPUT: {
            return {
                ...state,
                email: action.payload
            }
        }

        case signupConstants.UPDATE_AGE_INPUT: {
            return {
                ...state,
                age: action.payload
            }
        }

        case signupConstants.UPDATE_COUNTRY_INPUT: {
            return {
                ...state,
                country: action.payload
            }
        }

        default:
        return state;
    }
}

export default signupReducer;

