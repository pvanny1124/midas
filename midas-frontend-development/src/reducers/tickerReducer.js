import { suggestionBoxConstants } from '../actions/actions.suggestionBox';

const initialState = {
    ticker: null,
}

const tickerReducer = function(state = null, action){
    switch(action.type){


        case suggestionBoxConstants.UPDATE_TICKER: {
            return action.payload;
            break;
        }

        default:
        return state;
    }
            
}

export default tickerReducer;
     