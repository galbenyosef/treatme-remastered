import Autosuggest from 'react-autosuggest';
import React from 'react'
import './Autosuggest.scss'
import { randomNum } from '../Utilities/randomNum';
import { generateObjectId } from '../Utilities/generateObjectId';


class AutosuggestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      suggestions: [],
    };
  }


  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  escapeRegexCharacters = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  
  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');

    const suggestions = this.props.data.filter(language => regex.test(language.value))
    
    if (this.props.addable && suggestions.length === 0 && value !== '') {
      return [
        { isAddNew: true }
      ];
    }
    
    return suggestions;
  }

  getSuggestionValue = suggestion => {
    if (this.props.addable && suggestion.isAddNew) {
      return this.state.value;
    }
    
    return suggestion.value;
  };

  shouldRenderSuggestions = () => true

  renderSuggestion = suggestion => {
    if (this.props.addable && suggestion.isAddNew) {
      return (
        <span>
          [+] Add new: <strong>{this.state.value}</strong>
        </span>
      );
    }

    return suggestion.value;
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const {setFunction,showValue} = this.props

    if(setFunction){
      if (suggestion.isAddNew) {
        setFunction({value:this.state.value,new:true});
      }
      else{
        setFunction(suggestion)
      }
      if (!showValue)
        this.setState({...this.state,value:''})
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps} />
    );
  }
}


export  {AutosuggestComponent}