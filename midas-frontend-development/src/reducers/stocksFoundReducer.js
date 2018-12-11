import { stocksConstants } from '../actions/actions.stocks';
// import { initialState } from '../index';

const initialState = {
    // check if the stocks from IEX were properly loaded
    stocksFound: false
}

const stocksFoundReducer = function(state = false, action){

    switch(action.type){
        case stocksConstants.STOCKS_LOADED: {
            return true            
            break;
        }

        case stocksConstants.STOCKS_NOT_FOUND: {
            return false;
            break;
            
        }
        
        default:
        return state;
    }
};

export default stocksFoundReducer;