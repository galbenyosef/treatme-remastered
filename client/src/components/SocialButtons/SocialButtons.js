import React from 'react'
import call from '../../assets/Icons/call.png'
import facebook from '../../assets/Icons/facebook.png'
import gmail from '../../assets/Icons/gmail.png'
import googleplus from '../../assets/Icons/googleplus.png'
import instagram from '../../assets/Icons/instagram.png'
import linkedin from '../../assets/Icons/linkedin.png'
import messenger from '../../assets/Icons/messenger.png'
import pinterest from '../../assets/Icons/pinterest.png'
import skype from '../../assets/Icons/skype.png'
import sms from '../../assets/Icons/sms.png'
import snapchat from '../../assets/Icons/snapchat.png'
import telegram from '../../assets/Icons/telegram.png'
import twitter from '../../assets/Icons/twitter.png'
import waze from '../../assets/Icons/waze.png'
import website from '../../assets/Icons/website.png'
import whatsapp from '../../assets/Icons/whatsapp.png'
import youtube from '../../assets/Icons/youtube.png'

import { Grid,IconButton,Dialog,DialogTitle,DialogContent,DialogActions,Button } from '@material-ui/core'
import { connect } from 'react-redux'
 

const icons = {

    call,
    facebook,
    gmail,
    googleplus,
    instagram,
    linkedin,
    messenger,
    pinterest,
    skype,
    sms,
    snapchat,
    telegram,
    twitter,
    waze,
    website,
    whatsapp,
    youtube,

}

const webLinks = (buttons,iconName,index = 0) => {
    if (!buttons) return

    switch (iconName){
        case('call'):{
            return `tel://${buttons.call.data[index]}`
        }
        case('facebook'):{
            //fb://profile?id=
            return `https://www.facebook.com/${buttons.facebook.data[index]}`
        }
        case('gmail'):{
            //googlegmail:
            return `mailto:${buttons.gmail.data[index]}`
        }
        case('googleplus'):{
            //gplus://
            return `https://plus.google.com/u/0/+${buttons.googleplus.data[index]}`
        }
        case('instagram'):{
            //instagram://user?username=
            return `https://www.instagram.com/${buttons.instagram.data[index]}`
        }
        case('linkedin'):{
            //linkedin://profile/
            return `https://www.linkedin.com/in/${buttons.linkedin.data[index]}`
        }
        case('messenger'):{
            //fb-messenger://user/%s
            return `https://m.me/${buttons.messenger.data[index]}`
        }
        case('pinterest'):{
            return `${buttons.pinterest.data[index]}`
        }
        case('skype'):{
            return `skype://${buttons.skype.data[index]}?chat`
        }
        case('sms'):{
            return `sms://${buttons.sms.data[index]}`
        }
        case('snapchat'):{
            return `snapchat://${buttons.snapchat.data[index]}`
        }
        case('telegram'):{
            return `tg://msg?to=${buttons.telegram.data[index]}`
        }
        case('twitter'):{
            return `twitter://user?id=${buttons.twitter.data[index]}`
        }
        case('waze'):{
            const location = buttons.waze.data[index];
            const address = `${location.city}%20${location.streetname}%20${location.streetnumber}%20`
            return `https://waze.com/ul?q=${address}`
        }
        case('website'):{
            if (buttons.website.data[index].indexOf('://') < 0) {
                return `http://${buttons.website.data[index]}`
            }
            return `${buttons.website.data[index]}`
        }
        case('whatsapp'):{
            return `whatsapp://${buttons.whatsapp.data[index]}`
        }
        case('youtube'):{
            if ( buttons.youtube.data[index].length === 11 )
                return `https://www.youtube.com/watch?v=${buttons.youtube.data[index]}`
            else 
                return `${buttons.youtube.data[index]}`
        }
        default:{
            return ''
        }

    }
}

class SocialButtons extends React.Component {

    state = {

        multiDialogOpened: false,
        platform: '',
        index: 0,
        expanded : false

    }

    toggleExpand = () => {
        this.setState({
          expanded: !this.state.expanded
        })
    }

    openButtonDialog = (platform,index) => {
        this.setState({buttonDialogOpened:true,multiDialogOpened:false,index,platform})
    }

    closeButtonDialog = () => {
        this.setState({buttonDialogOpened:false,platform:''})
    }

    openMultiDialog = (platform) => {
        this.setState({multiDialogOpened:true,platform})
    }

    closeMultiDialog = () => {
        this.setState({multiDialogOpened:false,platform:''})
    }


    render(){
    const {buttons} = this.props
    const {platform,index} = this.state

    return (
    
        <div style={{width:'100%'}}>
            <Grid justify='center' container style={{maxWidth:'inherit'}}>
            {
                Object.keys(buttons).map((platform,idx) => {
                    if (buttons[platform].checked){
                        return (
                            <Grid style={{display:'flex',justifyContent:'center',alignItems:'center',height:'fit-content'}} key={idx} item xs={4}>
                                <IconButton onClick={() => buttons[platform].data.length > 1 ? this.openMultiDialog(platform)  :  window.open(webLinks(buttons,platform,index))} style={{height:'auto',width:'100%',padding:'20px 25px'}}>
                                    <img alt={platform} style={{width:'100%',borderRadius:'100%',backgroundColor:'white',boxShadow:'2px 2px 25px black'}} src={icons[platform]}/>
                                </IconButton>
                            </Grid>
                        )
                    }
                    else {
                        return null
                    }
                })
            }
            </Grid>

            {/* Multi Dialog */}
            <Dialog  disableEscapeKeyDown open={this.state.multiDialogOpened} onClose={this.closeMultiDialog}>
                <DialogContent>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    {
                        platform && 
                            buttons[platform].data.map(( value, idx) => 
                            <IconButton style={{width:'auto'}} key={idx} onClick={() => window.open(webLinks(buttons,platform,index))}>
                                <p style={{textAlign:'center'}}>{platform === 'waze' ? value.name : value}</p>
                            </IconButton>  
                            )
                        
                    }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeMultiDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
       </div> 
    )}
}

function mapStateToProps(state) {
    const {buttons} = state.user
    return {buttons}
}

const connectedSocialButtons = connect(mapStateToProps)(SocialButtons);
export {connectedSocialButtons as SocialButtons};