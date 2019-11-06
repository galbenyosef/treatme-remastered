import React from 'react'
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField  } from '@material-ui/core'

const contactSupportDialog = ({open,toggle,username,messageVal,messageChanged,sendMsg}) => (

    <Dialog open={open} onClose={toggle}>
        <DialogTitle>Contact us</DialogTitle>
        <DialogContent >
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',border:'1px solid black'}}>
                <TextField disabled  value={`From: ${username}`}/>
                <TextField multiline value={messageVal} onChange={(e) => {messageChanged(e.currentTarget.value)}}/>
            </div>
        </DialogContent>
        <DialogActions>
        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Button onClick={() => sendMsg(messageVal)} color="primary">
                Send
            </Button>
            <Button onClick={toggle} color="primary">
                Close
            </Button>
            </div>
        </DialogActions>
    </Dialog>

)

export  {contactSupportDialog as ContactSupportDialog}