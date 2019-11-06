import React from 'react';
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { AutosuggestComponent } from '../Autosuggest/Autosuggest';
import { toggleHMO } from '../../actions/userActions';
import { fromStrings } from '../Utilities/languageUtils';

class HMOs extends React.Component {

  state = {
    search:'',
    open:false,
    filtered: [],

  }

  render() {

    const { hmos,readonly,strings,hmosData,toggleHMO } = this.props;

    if (!hmos.length && readonly)
      return null

    return (
      <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
        <ExpansionPanel readonly={readonly} title={fromStrings(strings,`hmos-title`)} fa={'language'}>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',borderTop:'1px dashed grey',alignItems:'center'}}>
          { !readonly &&
            <div style={{margin:'10px',textAlign:'center',width:'50%'}} >
              <AutosuggestComponent addable={true} setFunction={toggleHMO} data={hmosData}/>
            </div>
          }
            {
              hmos.map(lang => <div key={lang.id}>{lang.value}</div>)
            }
          </div>
        </ExpansionPanel>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleHMO: (localeId) => dispatch(toggleHMO(localeId)),
   }
}

function mapStateToProps(state) {
  const {hmos} = state.user;
  const {hmos:hmosData} = state.data
  const {locale,strings} = state.locale
  return {hmos,locale,strings,hmosData}
}

const connectedHMOs = connect(mapStateToProps,mapDispatchToProps)(HMOs)
export { connectedHMOs as HMOs }