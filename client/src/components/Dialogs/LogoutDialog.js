import React from 'react'
import { Dialog,DialogTitle,DialogActions,Button  } from '@material-ui/core'

const logout = () => {localStorage.removeItem('treatmeUser');window.location.href=`${window.location.origin}/login`}

const logoutDialog = ({open,toggle}) => (

    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={toggle}>
        <DialogTitle>Are you sure ?</DialogTitle>
        <DialogActions>
        <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Button onClick={() => logout()} color="primary">
                Logout
            </Button>
            <Button onClick={toggle} color="primary">
                Stay connected
            </Button>
            </div>
        </DialogActions>
    </Dialog>

)

export  {logoutDialog as LogoutDialog}