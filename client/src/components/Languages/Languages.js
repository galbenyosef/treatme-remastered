import React from 'react';
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { AutosuggestComponent } from '../Autosuggest/Autosuggest';
import { toggleLanguage, toggleLanguageSpeaking, toggleLanguageWriting, toggleLanguageReading, changeLanguageLevel } from '../../actions/userActions';
import { FormGroup, FormControlLabel, Checkbox, Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { fromStrings } from '../Utilities/languageUtils'

class Languages extends React.Component {

  state = {
    search:'',
    open:false,
    filtered: [],

  }

  render() {

    const { 
      languages,
      readonly,
      strings,
      languagesData,
      toggleLanguage,
      changeLanguageLevel,
    } = this.props;

    if (!languages.length && readonly)
      return null

    return (
      <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
        <ExpansionPanel readonly={readonly} title={fromStrings(strings,`languages-title`)} fa={'language'}>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',borderTop:'1px dashed grey',alignItems:'center'}}>
          {
            readonly ?
            null
            :
            <div style={{margin:'10px',textAlign:'center',width:'50%'}} >
              <AutosuggestComponent setFunction={toggleLanguage} data={languagesData}/>
            </div>
          }
          {
            languages.map(lang => 
              <div style={{display:'flex',width:'80%',justifyContent:'space-between',alignItems:'center'}} key={lang.id}>
                <span>{lang.value}</span>
                {
                  readonly ? 
                  `${lang.level}`
                  :
                  <FormControl>
                    <Select
                      value={lang.level}
                      onChange={(e) => changeLanguageLevel(lang.id,e.target.value)}
                      >
                      <MenuItem value={'basic'}>{fromStrings(strings,'language-basic')}</MenuItem>
                      <MenuItem value={'good'}>{fromStrings(strings,'language-good')}</MenuItem>
                      <MenuItem value={'excellent'}>{fromStrings(strings,'language-excellent')}</MenuItem>
                    </Select>
                  </FormControl>
                }
                
              </div>
            )
          }
          </div>
        </ExpansionPanel>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLanguage: (localeId) => dispatch(toggleLanguage(localeId)),
    changeLanguageLevel: (id,level) => dispatch(changeLanguageLevel(id,level)),
   }
}

function mapStateToProps(state) {
  const {languages} = state.user;
  const {languages:languagesData} = state.data
  const {locale,strings} = state.locale
  return {languages,locale,strings,languagesData}
}

const connectedLanguages = connect(mapStateToProps,mapDispatchToProps)(Languages)
export { connectedLanguages as Languages }