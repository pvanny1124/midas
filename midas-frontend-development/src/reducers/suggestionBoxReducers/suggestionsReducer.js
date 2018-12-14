import { stocksConstants } from '../../actions/actions.stocks';
// import { initialState } from '../index';

const initialState = {
    // need to pass in list of tickers from IEX for suggestion box
    suggestions: [], 
}

const suggestionsReducer = function(state = [], action){

    switch(action.type){
        case stocksConstants.STOCKS_LOADED: {
            return action.payload;
            break;
        }
        
        default:
        return state;
    }
};

export default suggestionsReducer;