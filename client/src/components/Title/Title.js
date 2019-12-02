import React from 'react'
import { FormControlLabel, Checkbox, FormGroup, TextField } from '@material-ui/core'
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { fromStrings } from '../Utilities/languageUtils';
import Select from 'react-select/creatable'
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
            locale,
            mainSpeciality,
            mainSpecialities,
            setMainSpeciality,
            setTitle,
            setGender,
            setFirstname,
            setLastname,
            setDescription,
        } = this.props;
        console.log(titles)
        return (
            <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
                <ExpansionPanel readonly={readonly} title={fromStrings(strings,'title-title')} fa={'user-tie'}>
                {
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',borderTop:'1px dashed grey'}}>
                        <div  style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <div style={{width:'50%'}} >
                                <Select 
                                    isRtl
                                    isClearable
                                    isSearchable
                                    placeholder="title-mainSpeciality"
                                    onChange={val => 
                                        {
                                            if (val){
                                                if (val.__isNew__){
                                                    setMainSpeciality({...val,name:{[locale.symbol]:val.label}})
                                                }
                                                else{
                                                    setMainSpeciality(val)
                                                }
                                            }
                                            else{
                                                setMainSpeciality({})
                                            }
                                        }
                                    }
                                    value={Object.keys(mainSpeciality).length ? {...mainSpeciality,label:mainSpeciality.name && mainSpeciality.name[locale.symbol]}: null}
                                    options={mainSpecialities.map(mSpec => {return {...mSpec,label:mSpec.label[locale.symbol]}})}/>
                            </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'10px'}}>
                            <div style={{width:'30%'}} >
                            <Select 
                                    isRtl
                                    isClearable
                                    isSearchable
                                    placeholder="title-titles"
                                    onChange={val => 
                                        {
                                            if (val){
                                                if (val.__isNew__){
                                                    setTitle({...val,name:{[locale.symbol]:val.label}})
                                                }
                                                else{
                                                    setTitle(val)
                                                }
                                            }
                                            else{
                                                setTitle({})
                                            }
                                        }
                                    }
                                    value={Object.keys(title).length ? {...title,label:title.name && title.name[locale.symbol]} : null}
                                    options={titles.map(mSpec => {return {...mSpec,label:mSpec.label[locale.symbol]}})}/>
                            </div>
                            <TextField inputProps={{style:{textAlign:'center'}}} style={{width:'30%'}} label={fromStrings(strings,'title-firstname')} name="firstname" onChange={(e) => setFirstname({[locale.symbol]:e.target.value})} value={firstname[locale.symbol] || ''} />
                            <TextField inputProps={{style:{textAlign:'center'}}} style={{width:'30%'}} label={fromStrings(strings,'title-lastname')} name="lastname" onChange={(e) => setLastname({[locale.symbol]:e.target.value})} value={lastname[locale.symbol] || ''} />
                        </div>
                        <TextField style={{margin:'10px'}} inputProps={{style:{textAlign:'center'}}} label={fromStrings(strings,'title-description')} name="description" onChange={(e) => setDescription({[locale.symbol]:e.target.value})} value={description[locale.symbol] || ''} />
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
    const {strings,locale} = state.locale
    const { mainSpecialities,titles } = state.data
    return {title,titles,firstname,lastname,description,gender,strings,mainSpeciality,mainSpecialities,locale}
}

const connectedTitle = connect(mapStateToProps,mapDispatchToProps)(Title);
export {connectedTitle as Title}