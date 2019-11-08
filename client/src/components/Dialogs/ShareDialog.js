import React from 'react'
import sms from '../../assets/Icons/sms.png'
import whatsapp from '../../assets/Icons/whatsapp.png'
import gmail from '../../assets/Icons/gmail.png'
import { Dialog,DialogTitle,DialogContent,DialogActions,IconButton,Button  } from '@material-ui/core'

const shareDialog = ({open,toggle,url,username}) => (

    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={toggle}>
        <DialogTitle>Share this profile</DialogTitle>
        <DialogContent>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <IconButton onClick={() => window.open(`mailto:?to=&subject=Look%20at%20my%20profile&body=${url}/card/${username}`)}>
                    <img alt='mail' style={{width:'32px',height:'32px',borderRadius:'100%',backgroundColor:'white',boxShadow:'2px 2px 10px black'}} src={gmail}/>
                </IconButton>
                <IconButton onClick={() => window.open(`whatsapp://send?text=${url}/card/${username}`)}>
                    <img alt='whatsapp' style={{width:'32px',height:'32px',borderRadius:'100%',backgroundColor:'white',boxShadow:'2px 2px 10px black'}} src={whatsapp}/>
                </IconButton>
                <IconButton onClick={() => window.open(`sms:?body=${url}/card/${username}`)}>
                    <img alt='sms' style={{width:'32px',height:'32px',borderRadius:'100%',backgroundColor:'white',boxShadow:'2px 2px 10px black'}} src={sms}/>
                </IconButton>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={toggle} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>

)

export  {shareDialog as ShareDialog}