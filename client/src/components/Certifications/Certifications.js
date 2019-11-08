import React from 'react'
import { Button, TextField} from '@material-ui/core'
import { connect } from 'react-redux'
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { removeCertification,addCertification,changeCertification, setDegree } from '../../actions/userActions';
import { fromStrings } from '../Utilities/languageUtils';
import { AutosuggestComponent } from '../Autosuggest/Autosuggest';

class Certifications extends React.Component {

  render() {

    const {
      certifications,
      readonly,
      strings,
      addCertification,
      removeCertification,
      changeCertification,
      setDegree,
      degrees
    } = this.props

    if (!certifications.length && readonly)
      return null

    return (
      
      <div style={{backgroundColor:'white',margin:'10px',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px'}} >
        <ExpansionPanel readonly={readonly} title={fromStrings(strings,`certifications-title`)} fa={'user-graduate'}>
        {
          <div>
            {
              certifications.map((certification,certificationIdx) => {
                const certificationName = `${(certification.degree.value && certification.degree.value +',') || ''} ${certification.degreeName || ''}`

                  return (
                  <div style={{display:'flex',flexDirection:'column',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} key={certificationIdx}>
                    <ExpansionPanel readonly={readonly} title={certificationName} deleteFunction={readonly ? null : () => removeCertification(certificationIdx)}>
                    {
                      readonly ? 
                      <div>
                        <div>
                          {`${certification.degree.value},${certification.degreeName}`}
                        </div>
                        <div>
                          {`${certification.institute},${certification.end}`}
                        </div>
                        <div>
                          {`${certification.comment}`}
                        </div>
                      </div>

                      :
                      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
                          {
                            <AutosuggestComponent
                             addable
                             showValue
                             placeholder={fromStrings(strings,'certifications-degree')}
                             setFunction={(degree) => setDegree(certificationIdx,degree)}
                             value={certification.degree.value || ''}
                             data={degrees}/>
                          }
                          {
                            <TextField
                              inputProps={{style:{textAlign:'center'}}}
                              disabled={readonly}
                              style={{width:'45%',margin:'20px 0px'}}
                              name="degreeName"
                              type="text"
                              label={fromStrings(strings,`certifications-degreename`)}
                              value={certification.degreeName || ''}
                              onChange={(e) => changeCertification(certificationIdx,e.target.name,e.target.value)}/>
                          }
                          { 
                            <TextField
                              inputProps={{style:{textAlign:'center'}}}
                              disabled={readonly}
                              style={{width:'100%',margin:'20px 0px'}}
                              name="institute"
                              type="text"
                              label={fromStrings(strings,`certifications-institute`)}
                              value={certification.institute || ''}
                              onChange={(e) => changeCertification(certificationIdx,e.target.name,e.target.value)}/>
                          }
                          {
                            <TextField inputProps={{style:{textAlign:'center'}}}
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            name="end"
                            type="number"
                            label={fromStrings(strings,`certifications-yearend`)}
                            value={certification.end}
                            onChange={(e) => changeCertification(certificationIdx,e.target.name,e.target.value)}/>
                          }
                          {
                            <TextField inputProps={{style:{textAlign:'center'}}}
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            multiline
                            name="comment"
                            type="text"
                            label={fromStrings(strings,`certifications-comments`)}
                            value={certification.comment || ''}
                            onChange={(e) => changeCertification(certificationIdx,e.target.name,e.target.value)}/>
                          }
                      </div>
                    }
                    </ExpansionPanel>
                  </div>
                )
              })
            }
            {
              !readonly && 
              <div style={{margin:'10px',textAlign:'center'}} >
                <Button style={{boxShadow: 'darkcyan 0px 0px 10px 5px',borderRadius: '50px', margin: '20px auto'}} onClick={() => addCertification()}>{fromStrings(strings,`certifications-add`)}</Button>
              </div>
            }
          </div>
        }
        </ExpansionPanel>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCertification: () => dispatch(addCertification()),
    removeCertification: (id) => dispatch(removeCertification(id)),
    changeCertification: (index,name,value) => dispatch(changeCertification(index,name,value)),
    setDegree: (index,degree) => dispatch(setDegree(index,degree))
   }
}

function mapStateToProps(state) {
  const {certifications} = state.user
  const {strings} = state.locale
  const {degrees} = state.data

  return {certifications,strings,degrees}
}


const connectedCertifications = connect(mapStateToProps,mapDispatchToProps)(Certifications)
export { connectedCertifications as Certifications }