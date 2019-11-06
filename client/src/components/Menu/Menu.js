import React from 'react';
import { Menu,MenuItem,IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import config from '../../config/urls'
import { ContactSupportDialog } from '../Dialogs/ContactSupportDialog';
import { LogoutDialog } from '../Dialogs/LogoutDialog';
import { ShareDialog } from '../Dialogs/ShareDialog';
import { history } from '../../config/history';
import { Menu as MenuIcon } from '@material-ui/icons'
import { contactSupport } from '../../actions/userActions';
import { fromStrings } from '../Utilities/languageUtils';

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
    contactSupportDialog: false,
    logoutDialog: false,
    shareDialog: false,
    message: '',
  };


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  toggleContactSupportDialog = () => {
    this.setState((prevState) => { return {contactSupportDialog:!prevState.contactSupportDialog}})
  }

  toggleLogoutDialog = () => {
    this.setState((prevState) => { return {logoutDialog:!prevState.logoutDialog}})
  }

  toggleShareDialog = () => {
    this.setState((prevState) => { return {shareDialog:!prevState.shareDialog}})
  }

  messageChanged = (val) => {
    this.setState({message:val})
  }

  render() {
    const stored = localStorage.getItem('treatmeUser')
    const { anchorEl,contactSupportDialog,logoutDialog,shareDialog,message } = this.state;
    const {strings,sendMsg} = this.props
    const loggedInUsername = stored ? JSON.parse(stored).username : undefined

    const onEditPage = window.location.pathname.includes('/admin')

    return (
      <div >
        <IconButton onClick={this.handleMenu} style={{padding:0}}>
          <MenuIcon style={{fontSize:'48px',color:'white'}}/>
        </IconButton>
        <div>
          <Menu  id="menu-appbar" open={Boolean(anchorEl)} onClose={this.handleClose} anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
              transformOrigin={{vertical: 'top',horizontal: 'right',}}>
            <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
              {
                  loggedInUsername ?

                  (onEditPage ?
                    <div>
                      <MenuItem onClick={() => history.push(`/card/${loggedInUsername}`)}>{fromStrings(strings,`menu-profile`)}</MenuItem>
                      <MenuItem onClick={() => history.push(`/register`)}>{fromStrings(strings,`menu-create`)}</MenuItem>
                      <MenuItem onClick={() => this.toggleContactSupportDialog()}>{fromStrings(strings,`menu-support`)}</MenuItem>
                      <MenuItem onClick={() => this.toggleLogoutDialog()}>{fromStrings(strings,`menu-logout`)}</MenuItem>
                    </div>
                    :
                    <div>
                      <MenuItem onClick={() => history.push(`/card/${loggedInUsername}/admin`)}>{fromStrings(strings,`menu-edit`)}</MenuItem>
                      <MenuItem onClick={() => history.push(`/register`)}>{fromStrings(strings,`menu-create`)}</MenuItem>
                      <MenuItem onClick={() => this.toggleShareDialog()}>{fromStrings(strings,`menu-share`)}</MenuItem>
                      <MenuItem onClick={() => this.toggleContactSupportDialog()}>{fromStrings(strings,`menu-support`)}</MenuItem>
                      <MenuItem onClick={() => this.toggleLogoutDialog()}>{fromStrings(strings,`menu-logout`)}</MenuItem>
                    </div>)
                  :
                   <div>
                    <MenuItem onClick={() => history.push(`/login`)}>{fromStrings(strings,`menu-login`)}</MenuItem>
                    <MenuItem onClick={() => history.push(`/register`)}>{fromStrings(strings,`menu-register`)}</MenuItem>
                  </div>
              }
            </div>
          </Menu>
          <ContactSupportDialog sendMsg={sendMsg} username={loggedInUsername} open={contactSupportDialog} toggle={this.toggleContactSupportDialog} messageVal={message} messageChanged={this.messageChanged}/>
          <LogoutDialog username={loggedInUsername} open={logoutDialog} toggle={this.toggleLogoutDialog}/>
          <ShareDialog open={shareDialog} toggle={this.toggleShareDialog} url={config.client} username={loggedInUsername}/>
        </div>
      </div>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    sendMsg: (message) => dispatch(contactSupport(message))
  }
}

const mapStateToProps = (state) => {

  const {strings} = state.locale
  const {username} = state.user
  return {strings,username}
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuAppBar);
