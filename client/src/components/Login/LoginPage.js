import React from 'react'
import {TextField,Button} from '@material-ui/core'
import { connect } from 'react-redux';
import LoginUserSelectionDialog from '../Dialogs/LoginUserSelectionDialog';
import { login,forgotPassword,changeFieldValue, } from '../../actions/loginActions';
import BottomBarBasic from '../BottomBar/BottomBarBasic';
import { history } from '../../config/history';
import BackgroundImage from '../../assets/login_background.jpg'
import { fromStrings } from '../Utilities/languageUtils';

class LoginPage extends React.Component {

    componentDidMount(){
        const {token,username} = this.props.match.params
        if (token && username){
            localStorage.setItem('treatmeUser',{token,username})
        }
        const currentUsername = JSON.parse(localStorage.getItem('treatmeUser')) && JSON.parse(localStorage.getItem('treatmeUser')).username
        if (currentUsername){
            history.replace(`/card/${currentUsername}`)
        }
    }


    render() {
        
        const { username,password,showForgotPassword,multiUserDialog,strings,changeFieldValue } = this.props
        return (
            <div style={{backgroundRepeat:'round',backgroundImage:`url(${BackgroundImage})`,margin:'auto', maxWidth:'500px',minHeight:'100vh',display:'flex', flexDirection:'column',alignItems:'center',textAlign:'center',justifyContent:'space-between'}}>
     {/*            <div style={{ padding:'20px 0px 20px 0px',alignItems: 'center',display:'flex',justifyContent: 'center',margin:'auto'}}>
                    <img alt='logo' src={Logo} title="Treatme Logo"/>
                </div> */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly',flex:1,marginTop:'45vh',marginBottom:'15vh'}}>
                    <TextField 
                        autoFocus
                        inputProps={{style:{textAlign:'center',color:'white',borderBottom:'3px solid white'}}}
                        InputLabelProps={{style:{right:0,margin:'auto',position:'static',color:'white',fontWeight:'bold'}}}
                        name="username"
                        label={(strings && strings.getString(`login-username`)) || 'login-username'}
                        value={username}
                        onChange={(event) => {
                            const {name,value} = event.target
                            changeFieldValue(name,value)}
                        } />
                    <TextField
                        inputProps={{style:{textAlign:'center',color:'white',borderBottom:'3px solid white'}}}
                        InputLabelProps={{style:{right:0,margin:'auto',position:'static',color:'white',fontWeight:'bold'}}}
                        name="password"
                        type='password'
                        label={fromStrings(strings,`login-password`)}
                        value={password}
                        onChange={(event) => {
                            const {name,value} = event.target
                            changeFieldValue(name,value)}
                        } />
                    {   
                        showForgotPassword &&
                        <p style={{color:'#24babc',fontSize:'24px',margin:'0px',textDecoration: 'underline',fontWeight:'bold',textAlign:'center',cursor:'pointer'}} 
                            onClick={() => this.props.forgotPassword(username)}>{fromStrings(strings,`login-forgotpass`)}
                        </p>
                    }
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
                        <Button style={{color:'white'}} onClick={() => this.props.login(username,password)}>{fromStrings(strings,`login-submit`)}</Button>
                        <Button style={{color:'white'}} onClick={() => history.push(`/register`)}>{fromStrings(strings,`login-register`)}</Button>
                    </div>
                </div>
                <BottomBarBasic/>
                {
                    multiUserDialog.length ? <LoginUserSelectionDialog users={multiUserDialog}/> : null
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username,password) => dispatch(login(username,password)),
        forgotPassword: (username) => dispatch(forgotPassword(username)),
        changeFieldValue: (name,value) => dispatch(changeFieldValue(name,value)),
    }
}

const mapStateToProps = state => {
    const {locale,strings} = state.locale;
    const {username,password,showForgotPassword,multiUserDialog} = state.login

    return {locale,strings,username,password,showForgotPassword,multiUserDialog}
}

const connectedLoginPage = connect(mapStateToProps,mapDispatchToProps)(LoginPage);
export default (connectedLoginPage);
