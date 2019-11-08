import React from 'react'
import { FormControlLabel, Checkbox, FormGroup, TextField } from '@material-ui/core'
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { fromStrings } from '../Utilities/languageUtils';
import { AutosuggestComponent } from '../Autosuggest/Autosuggest';
import { setMainSpeciality, setTitle, setGender, setFirstname, setDescription, setLastname } from '../../actions/userActions';



class Title extends React.Component  {
    
    render(){

        const {
            firstname,
            lastname,
            description,
            gender,
            readonly,
            strings,
            title,
            titles,
            language,
            mainSpeciality,
            mainSpecialities,
            setMainSpeciality,
            setTitle,
            setGender,
            setFirstname,
            setLastname,
            setDescription,
        } = this.props;

        return (
            <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
                <ExpansionPanel readonly={readonly} title={fromStrings(strings,'title-title')} fa={'user-tie'}>
                {
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',borderTop:'1px dashed grey'}}>
                        <div  style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <div style={{width:'50%'}} >
                                <AutosuggestComponent showValue addable placeholder="title-mainSpeciality" setFunction={setMainSpeciality} value={mainSpeciality.value || ''} data={mainSpecialities}/>
                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'10px'}}>
                            <div style={{width:'30%'}} >
                                <AutosuggestComponent showValue addable placeholder="title-titles" setFunction={setTitle} value={title.value || ''} data={titles}/>
                            </div>
                            <TextField inputProps={{style:{textAlign:'center'}}} style={{width:'30%'}} label={fromStrings(strings,'title-firstname')} name="firstname" onChange={(e) => setFirstname(e.target.value)} value={firstname || ''} />
                            <TextField inputProps={{style:{textAlign:'center'}}} style={{width:'30%'}} label={fromStrings(strings,'title-lastname')} name="lastname" onChange={(e) => setLastname(e.target.value)} value={lastname || ''} />
                        </div>
                        <TextField style={{margin:'10px'}} inputProps={{style:{textAlign:'center'}}} label={fromStrings(strings,'title-description')} name="description" onChange={(e) => setDescription(e.target.value)} value={description || ''} />
                        <FormGroup style={{flexDirection:'row',justifyContent:'center',margin:'10px'}}>
                            <FormControlLabel label={fromStrings(strings,'title-male')} control={<Checkbox checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} value="female" />}/>
                            <FormControlLabel label={fromStrings(strings,'title-female')} control={<Checkbox color='primary' checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} value="male" />}/>
                        </FormGroup> 
                    </div>
                }
                </ExpansionPanel>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMainSpeciality: speciality => dispatch(setMainSpeciality(speciality)),
        setTitle: title => dispatch(setTitle(title)),
        setGender: gender => dispatch(setGender(gender)),
        setFirstname: firstname => dispatch(setFirstname(firstname)),
        setLastname: lastname => dispatch(setLastname(lastname)),
        setDescription: description => dispatch(setDescription(description))
    }
  }

function mapStateToProps(state) {
    const {title,firstname,lastname,description,gender,mainSpeciality} = state.user
    const {strings,language} = state.locale
    const { mainSpecialities,titles } = state.data
    return {title,titles,firstname,lastname,description,gender,strings,language,mainSpeciality,mainSpecialities}
}

const connectedTitle = connect(mapStateToProps,mapDispatchToProps)(Title);
export {connectedTitle as Title}