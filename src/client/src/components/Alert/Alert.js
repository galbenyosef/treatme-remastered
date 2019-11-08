import React from 'react';
import { connect } from 'react-redux';
import {Dialog, DialogTitle, DialogActions, Button} from '@material-ui/core'
import { handleCloseAlert } from '../../actions/alertActions';

const Alert = ({message,open,handleCloseAlert}) => {

    return (
        <Dialog open={open} onClose={handleCloseAlert} >
            <DialogTitle>{"System Message"}</DialogTitle>
                <div style={{textAlign:'center'}}>
                    {message}
                </div>
            <DialogActions>
                <Button onClick={handleCloseAlert} color="primary" autoFocus>
                Okay
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        handleCloseAlert: () => dispatch(handleCloseAlert()),
    }
  }

const mapStateToProps = state => {
    const {message,open} = state.alert
    return {message,open}
}

const connectedAlert = connect(mapStateToProps,mapDispatchToProps)(Alert)
export { connectedAlert as Alert }