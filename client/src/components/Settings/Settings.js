import React from 'react'
import { Button,Input,InputAdornment,Checkbox  } from '@material-ui/core'
import {AddCircleOutline,DeleteForever, } from '@material-ui/icons'
import { connect } from 'react-redux';
import regExp from '../Utilities/regExp';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { fromStrings } from '../Utilities/languageUtils';
import { addAuthorized,removeAuthorized,changeAuthorized,toggleSearchable} from '../../actions/userActions'

class Settings extends React.Component {

    state = {
        authInput: '',
    }

    changeAuthInput = event => {

        const {value } = event.target
        this.setState({authInput:value})

    }

    render() {

    const {
      viewCountDaily,
      viewCountMonthly,
      readonly,
      toggleActivate,
      removeAccount,
      active,
      strings,
      authorized,
      searchable,
      valid,
      verified,
      addAuthorized,
      removeAuthorized,
      changeAuthorized,
      toggleSearchable
    } = this.props;
    const { expanded,authInput } = this.state

    return (
        <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
            <ExpansionPanel readonly={readonly} title={fromStrings(strings,`settings-title`)} fa={'cog'}>
            {
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p>{`${fromStrings(strings,`settings-daily`)} ${viewCountDaily}`}</p>
                    <p>{`${fromStrings(strings,`settings-monthly`)} ${viewCountMonthly}`}</p>
                    <div style={{display:'flex',alignItems:'center',width:'70%',justifyContent:'space-between'}}>
                      <Checkbox type="checkbox" checked={!!searchable} onChange={() => toggleSearchable()}/>
                      <span style={{margin:'20px'}}>Searchable</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',width:'70%',justifyContent:'space-between'}}>
                      <Checkbox disabled type="checkbox" checked={!!valid}/>
                      <span style={{margin:'20px'}}>Valid</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',width:'70%',justifyContent:'space-between'}}>
                      <Checkbox disabled type="checkbox" checked={!!verified}/>
                      <span style={{margin:'20px'}}>Verified</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',width:'70%',justifyContent:'space-between'}}>
                      <Checkbox disabled type="checkbox" checked={!!active}/>
                      <span style={{margin:'20px'}}>Active</span>
                    </div>

                    <Input onChange={this.changeAuthInput} value={authInput}  error={!!authInput && !regExp.email.test(authInput)} placeholder={'Add authorized user'}
                      startAdornment={
                        <InputAdornment>
                          <AddCircleOutline style={{width:'48px'}} onClick={() => addAuthorized(authInput)}/>
                        </InputAdornment>
                      } 
                    />

                    {
                      authorized.map((auth,index) => <Input key={index}  inputProps={{style:{textAlign:'center'}}}   
                        placeholder={`${fromStrings(strings,`settings-authorized`)} #${index}`}
                        value={auth}
                        endAdornment={
                            <InputAdornment>
                                <DeleteForever style={{width:'48px'}} onClick={() => removeAuthorized(index)}/>
                            </InputAdornment>
                            } 
                        onChange={(e) => changeAuthorized(index,e.target.value)}
                        />
                      )
                    }

                    {
                        active ? 
                            <Button style={{margin: '20px',color: 'white', backgroundColor: 'orange', fontSize: 'small',fontWeight: 700,textShadow: '3px 3px 5px black'}} onClick={toggleActivate}>{fromStrings(strings,`settings-deactivate`)}</Button>
                            :
                            <Button style={{margin: '20px',color: 'white', backgroundColor: 'green', fontSize: 'small',fontWeight: 700,textShadow: '3px 3px 5px black'}} onClick={toggleActivate}>{fromStrings(strings,`settings-activate`)}</Button>

                    }
                    <Button style={{margin: '20px',color: 'white', backgroundColor: 'red', fontSize: 'small',fontWeight: 700,textShadow: '3px 3px 5px black'}}  onClick={removeAccount}>{fromStrings(strings,`settings-delete`)}</Button>

                </div>
            }
            </ExpansionPanel>
        </div>
                        
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addAuthorized: email => dispatch(addAuthorized(email)),
    removeAuthorized: index => dispatch(removeAuthorized(index)),
    changeAuthorized: (index,value) => dispatch(changeAuthorized(index,value)),
    toggleSearchable: () => dispatch(toggleSearchable()),
  }
}

function mapStateToProps(state) {
    const {viewCountDaily,viewCountMonthly,active,verified,valid,searchable,authorized} = state.user
    const {strings} = state.locale

    return {viewCountDaily,viewCountMonthly,active,verified,valid,searchable,authorized,strings}
}

const connectedSettings = connect(mapStateToProps,mapDispatchToProps)(Settings);
export { connectedSettings as Settings }