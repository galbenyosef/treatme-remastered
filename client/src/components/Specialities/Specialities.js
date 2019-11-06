import React from 'react'
import { connect } from 'react-redux'
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { SpecialitiesTree } from './SpecialitiesTree';
import { isObjectEmpty } from '../Utilities/isObjectEmpty'
import { AutosuggestComponent } from '../Autosuggest/Autosuggest';
import { setSpeciality } from '../../actions/userActions';
import { fromStrings } from '../Utilities/languageUtils';

class Specialities extends React.Component {


  // This takes a node and loops over the lookup hash to get all of the ancestors
  findAncestors(specialities,spec) {
    var ancestors = []
    var parentId = spec.parent_id
    while(parentId !== undefined) {
      const parent = specialities.find(spec => spec.id === parentId)
      parentId = parent && parent.parent_id
      ancestors.unshift(parent.value)
    }
    ancestors.push(spec.value)
    return ancestors.join(' - ');
  }

  render() {

    const { mainSpeciality,readonly,strings,specialitiesData,specialities,setSpeciality,specialitiesView } = this.props

    if (isObjectEmpty(mainSpeciality))
      return <span>Please select main speciality</span>

    if (readonly && !specialities.length)
      return null
    
    return (
      <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
        <ExpansionPanel deleteButton={!readonly} readonly={readonly} title={fromStrings(strings,`specialities-title`)} fa={'user-md'}>
        {
          readonly ?
            <div>
            {
              specialitiesView.map(spec => <div key={spec.id}>{`${this.findAncestors(specialitiesView,spec)}`}</div>)
            }
            </div>
          :
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',borderTop:'1px dashed grey',alignItems:'center'}}>
            <div style={{width:'50%'}}>
              <AutosuggestComponent placeholder="specialities-placeholder" setFunction={setSpeciality}  data={specialitiesData}/>
            </div>
            <div style={{width:'90%'}}>
              <SpecialitiesTree/>
            </div>
          </div>
        }
        </ExpansionPanel>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSpeciality: (speciality) => dispatch(setSpeciality(speciality))
  }
}

function mapStateToProps(state) {
  const {mainSpeciality,specialities} = state.user
  const {language,strings} = state.locale
  const { specialities:specialitiesData,specialitiesTree,specialitiesView } = state.data
  return {mainSpeciality,specialities,language,strings,specialitiesData,specialitiesTree,specialitiesView}
}

const connectedSpecialities = connect(mapStateToProps,mapDispatchToProps)(Specialities);
export {connectedSpecialities as Specialities};
