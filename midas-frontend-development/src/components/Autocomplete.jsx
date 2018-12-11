import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import "../../public/styles/style.css";
import { BrowserHistory, withRouter} from 'react-router-dom';

import { connect } from 'react-redux';

//import action creators for suggestion box
import { updateSuggestionBoxUserInput, 
         resetInput, 
         updateTicker,
         incrementActiveSuggestion,
         decrementActiveSuggestion 
       } from "../actions/actionCreators";


//Redux Mapping
const mapStateToProps = state => {
   return {
        activeSuggestion: state.activeSuggestion,
        filteredSuggestions: state.filteredSuggestions,
        showSuggestions: state.showSuggestions,
        userInput: state.userInput
    }
}

const mapDispatchToProps = dispatch => ({
    updateInput(input_value, filteredSuggestions) {
      dispatch(updateSuggestionBoxUserInput(input_value, filteredSuggestions));
    },

    updateTicker(ticker) {
      dispatch(updateTicker(ticker));
    },
    
    resetInput() {
      dispatch(resetInput());
    },

    incrementActiveSuggestion(){
      dispatch(incrementActiveSuggestion());
    },

    decrementActiveSuggestion(){
      dispatch(decrementActiveSuggestion());
    }
})



class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.symbol.toLowerCase() == userInput.toLowerCase()  || suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    ).slice(0, 20);

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    console.log("%cINPUT BEFORE DISPATCH: " + e.target.value, "color: orange");
    console.log("%cFILTERED SUGGESTIONS BEFORE DISPATCH: ", "color: blue");
    console.log(filteredSuggestions);
    this.props.updateInput(e.target.value, filteredSuggestions);

    
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.props.resetInput();

    const { activeSuggestion, filteredSuggestions } = this.props;
    let enteredSymbol = filteredSuggestions[activeSuggestion].symbol;

    //update ticker in state
    this.props.updateTicker(enteredSymbol);

    this.props.history.push(`/stocks/${enteredSymbol.toLowerCase()}`);
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {

    const { activeSuggestion, filteredSuggestions } = this.props;

    try {

      // User pressed the enter key, update the input and close the suggestions
      if (e.keyCode === 13) {
        
        let enteredSymbol = filteredSuggestions[activeSuggestion].symbol;

        //pass name of ticker up to main component
        this.props.updateTicker(enteredSymbol);

        //reset so that the user doesnt have to manually delete the input field to enter another stock
        this.props.resetInput()

        //Show stock info page as soon as user presses enter
        this.props.history.push(`/stocks/${enteredSymbol.toLowerCase()}`);
      }

      // User pressed the up arrow, decrement the index
      else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
        }

      this.props.decrementActiveSuggestion();
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.props.incrementActiveSuggestion();
    }

  } catch (error) {
      //user entered gibberish at this point...
      console.log(error);
  }
  };


  render() {
    const { onChange, onClick, onKeyDown } = this;

    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.props;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="list-group">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "active";
              }

              return (
                <li
                  className={"list-group-item " + className}
                  key={suggestion.symbol}
                  onClick={onClick}
                >
                  {suggestion.name + " " + "(" + suggestion.symbol + ")"}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <div>
            <Fragment>
            
            <div class="input-group">
                <input type="text" 
                      className="form-control nav-input" 
                      placeholder="Lookup a stock" 
                      aria-label="Recipient's username" 
                      aria-describedby="basic-addon2"
                      onChange={onChange}
                      onKeyDown={onKeyDown}
                      value={userInput}
                />
            </div>


            {suggestionsListComponent}
          </Fragment>
        </div>
     
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Autocomplete));