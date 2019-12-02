import React from 'react'
import {TextField,Button,Checkbox} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Logo from '../../assets/logo.jpg'
import BottomBarBasic from '../BottomBar/BottomBarBasic';
import TermsDialog from '../Dialogs/TermsDialog';
import regExp from '../Utilities/regExp';
import { register,toggleTerms,handleChange,handleCheck} from '../../actions/registerActions';
import { setMainSpecialityRegistration, setDataMainSpecialities } from '../../actions/userActions';
import Select from 'react-select/creatable'
import { getRegisterPageData } from '../../actions/dataActions';
import { fromStrings } from '../Utilities/languageUtils';

class RegisterPage extends React.Component {


    componentDidMount = () => {

        const {getRegisterPageData,locale} = this.props
        getRegisterPageData(locale._id)
    }

    componentWillReceiveProps = (nextProps,nextState) => {
        const {getRegisterPageData} = this.props
        if (JSON.stringify(nextProps.locale) !== JSON.stringify(this.props.locale)){
            getRegisterPageData(nextProps.locale._id)
        }
    }


    handleSubmit = () => {

        const { 
            username,
            password,
            email,
            firstname,
            lastname,
            mobile,
            mainSpeciality,
            register,
        } = this.props

        const user = {
            username,
            password,
            email,
            firstname,
            lastname,
            mobile,
            mainSpeciality
        }

        register(user);

    }

    isValid = () => {

        const { username,
            email,
            firstname,
            lastname,
            mobile,
            mainSpeciality,
            password,
            passwordVerif,
            accepted,
            editor 
        } = this.props
        
        if ( 
            password !== passwordVerif ||
            (editor && mainSpeciality === '')||
            !regExp.email.test(email) ||
            !regExp.password.test(password) ||
            !regExp.username.test(username) ||
            !regExp._name.test(firstname) ||
            !regExp._name.test(lastname) ||
            !regExp.phone.test(mobile) ||
            !accepted ||
            (!editor && !mainSpeciality.length) 
        ){
                return false
        }

        return true
    }


    render() {

        const { 
            username,
            email,
            firstname,
            lastname,
            mobile,
            mainSpeciality,
            strings,
            locale,
            password,
            passwordVerif,
            mainSpecialities,
            editor,
            accepted,
            termsDialogOpened,
            toggleTerms,
            handleChange,
            handleCheck,
            setMainSpecialityRegistration,
            setDataMainSpecialities
        } = this.props

        let buttonEnabled = this.isValid()
        console.log(mainSpecialities)
        return (
            <div style={{minHeight:'100vh',margin:'auto', maxWidth:'500px', display:'flex', flexDirection:'column',alignItems:'center',textAlign:'center'}}>

                <div style={{margin:'20px auto',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img alt='logo' src={Logo} title="Treatme Logo"/>
                </div>

                <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',flex:1}}>
                    <Link to="/login">{fromStrings(strings,`register-already`)}</Link>

                    <div style={{display:'flex',justifyContent:'space-evenly',width:'inherit'}}>
                        <TextField
                            InputLabelProps={{style:{right:0,margin:'auto',position:'static'}}}
                            inputProps={{style:{textAlign:'center'}}}
                            style={{width:'45%'}}
                            helperText={!!firstname[locale.symbol] && !regExp._name.test(firstname[locale.symbol]) && "Minimum length: 2, Maximum length: 16, No special signs allowed"}
                            error={!!firstname[locale.symbol] && !regExp._name.test(firstname[locale.symbol])}
                            name="firstname"
                            type="text"
                            label={fromStrings(strings,`register-firstname`)}
                            value={firstname[locale.symbol] || ''}
                            onChange={(event) => {
                                const {name,value} = event.target
                                let newFirstname = {...firstname}
                                newFirstname[locale.symbol] = value
                                handleChange(name,newFirstname)}
                            } />
                        <TextField
                            InputLabelProps={{style:{right:0,margin:'auto',position:'static'}}}
                            inputProps={{style:{textAlign:'center'}}}
                            style={{width:'45%'}} 
                            helperText={!!lastname[locale.symbol] && !regExp._name.test(lastname[locale.symbol]) && "Minimum length: 2, Maximum length: 16, No special signs allowed"}
                            error={!!lastname[locale.symbol] && !regExp._name.test(lastname[locale.symbol])}
                            name="lastname"
                            type="text"
                            label={fromStrings(strings,`register-lastname`)}
                            value={lastname[locale.symbol] || ''}
                            onChange={(event) => {
                                const {name,value} = event.target
                                let newLastname = {...lastname}
                                newLastname[locale.symbol] = value
                                handleChange(name,newLastname)}
                            } />
                    </div>

                    <div style={{display:'flex',justifyContent:'space-evenly',width:'inherit'}}>
                        <TextField
                            InputLabelProps={{style:{right:0,margin:'auto',position:'static'}}}
                            inputProps={{style:{textAlign:'center'}}}
                            helperText={!!username && !regExp.username.test(username) && "Minimum length: 4, Maximum length: 16, No special signs allowed"}
                            error={!!username && !regExp.username.test(username)}
                            name="username"
                            type="text"
                            label={fromStrings(strings,`register-username`)}
                            value={username}
                            onChange={(event) => {
                                const {name,value} = event.target
                                handleChange(name,value,null)}
                            } />
                    </div>

                    <div style={{display:'flex',justifyContent:'space-evenly',width:'inherit'}}>
                        <TextField 
                            InputLabelProps={{style:{right:0,margin:'auto',position:'static'}}}
                            inputProps={{style:{textAlign:'center'}}}
                            style={{width:'45%'}}
                            helperText={!!password && !regExp.password.test(password) && "Minimum length: 6, Maximum length: 16, No special signs allowed"}
                            error={!!password && !regExp.password.test(password)}
                            name="password"
                            type="password"
                            label={fromStrings(strings,`register-password`)}
                            value={password}
                            onChange={(event) => {
                                const {name,value} = event.target
                                handleChange(name,value,null)}
                            } />                        <TextField 
                            InputLabelProps={{style:{right:0,margin:'auto',position:'static'}}} 
                            inputProps={{style:{textAlign:'center'}}} style={{width:'45%'}} 
                            helperText={!!password && !!passwordVerif && (password !== passwordVerif) && "Password doesn't match"}
                            error={!!password && !!passwordVerif && (password !== passwordVerif)}
                            name="passwordVerif"
                            type="password"
                            label={fromStrings(strings,`register-passwordverify`)}
                            value={passwordVerif}
                            onChange={(event) => {
                                const {name,value} = event.target
                                handleChange(name,value,null)}
                            } />
                    </div>

                    <div style={{display:'flex',justifyContent:'space-evenly',width:'inherit'}}>
                        <TextField
                            InputLabelProps={{style:{right:0,margin:'auto',position:'static'}}}
                            inputProps={{style:{textAlign:'center'}}} style={{width:'45%'}}
                            helperText={!!mobile && !regExp.phone.test(mobile) && "Mobile number is wrong"}
                            error={!!mobile && !regExp.phone.test(mobile)}
                            name="mobile"
                            type="text"
                            label={fromStrings(strings,`register-mobile`)}
                            value={mobile}
                            onChange={(event) => {
                                const {name,value} = event.target
                                handleChange(name,value,null)}
                            } />
                        <TextField 
                            InputLabelProps={{style:{right:0,margin:'auto',position:'static'}}}
                            inputProps={{style:{textAlign:'center'}}} style={{width:'45%'}}
                            helperText={!!email && !regExp.email.test(email) && "Email doesn't exists"}
                            error={!!email && !regExp.email.test(email)}
                            name="email"
                            type="email"
                            label={fromStrings(strings,`register-email`)}
                            value={email}
                            onChange={(event) => {
                                const {name,value} = event.target
                                handleChange(name,value,null)}
                            } />
                    </div>

                    <div style={{textAlign:'center'}}>
                        <Checkbox
                            style={{width:'auto',height:'auto'}}
                            checked={editor}
                            name='editor'
                            onChange={(event) => {
                                const {name,checked} = event.target
                                handleCheck(name,checked)}
                            }
                            color="primary"/>
                        <span style={{ fontSize: 'small' }}>{fromStrings(strings,`register-editor`)}</span>
                    </div>

                    <div style={{textAlign:'center'}}>
                        <Checkbox
                            style={{width:'auto',height:'auto'}}
                            checked={accepted} name='accepted'
                            onChange={(event) => {
                                const {name,checked} = event.target
                                handleCheck(name,checked)}
                            }
                            color="primary"/>
                        <span style={{ fontSize: 'small' }}>{fromStrings(strings,`register-ireadterms`)}<span style={{ textDecoration: 'underline', color: 'blue' }} onClick={toggleTerms}>{fromStrings(strings,`register-iacceptterms`)}</span></span>
                    </div>

                    <TermsDialog
                        toggle={toggleTerms}
                        open={termsDialogOpened} />

                    {
                        !editor &&
                        <Select
                            isClearable
                            isRtl
                            isSearchable
                            styles={{container: style => {return {...style,width:'50%'}}}}
                            placeholder="title-mainSpeciality"
                            onChange={mainSpec => {
                                if (mainSpec){
                                    if (mainSpec.__isNew__)
                                        setMainSpecialityRegistration({...mainSpec,name:{[locale.symbol]:mainSpec.value}})
                                    else
                                        setMainSpecialityRegistration(mainSpec)
                                    }
                                else{
                                    setMainSpecialityRegistration({})
                                }
                            }}
                            value={Object.keys(mainSpeciality).length ? mainSpeciality : null}
                            formatCreateLabel={text => `${text} [+]`}
                            options={mainSpecialities.map(m => {return {...m,value:m._id,label:m.name[locale.symbol]}})}/>
                    }

                    <Button 
                        style={{borderRadius:'50px'}}
                        disabled={buttonEnabled}
                        color="primary"
                        onClick={this.handleSubmit}>
                        {fromStrings(strings,`register-submit`)}
                    </Button>
                
                </div>

                <BottomBarBasic/>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=> {

    return {
        getRegisterPageData: localeId => dispatch(getRegisterPageData(localeId)),
        register: (user,localeId) => dispatch(register(user,localeId)),
        toggleTerms: () => dispatch(toggleTerms()),
        handleChange: (name,value) => dispatch(handleChange(name,value)),
        handleCheck: (name,checked) => dispatch(handleCheck(name,checked)),
        setMainSpecialityRegistration: mainSpeciality => dispatch(setMainSpecialityRegistration(mainSpeciality)),
        setDataMainSpecialities: mainSpecialities => dispatch(setDataMainSpecialities(mainSpecialities))
    }
    
}

const mapStateToProps = state => {

    const {
        locale,
        strings
    } = state.locale

    const { 
        username,
        email,
        firstname,
        lastname,
        mobile,
        editor,
        mainSpeciality,
        password,
        passwordVerif,
        termsDialogOpened,
        accepted,
    } = state.register

    const {
        mainSpecialities
    } = state.data

    return {
        locale,
        strings,
        username,
        email,
        firstname,
        lastname,
        mobile,
        editor,
        mainSpeciality,
        password,
        passwordVerif,
        termsDialogOpened,
        accepted,
        mainSpecialities,
    }
}

const connectedRegisterPage = connect(mapStateToProps,mapDispatchToProps)(RegisterPage)
export default (connectedRegisterPage)
