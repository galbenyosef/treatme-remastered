import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const TermsDialog = (props) => {
    return(
      <div>
        <Dialog open={props.open} scroll='paper' aria-labelledby="scroll-dialog-title">
          <DialogTitle id="scroll-dialog-title">Terms</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Terms
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.toggle} color="primary">
              Cancel
            </Button>
            <Button onClick={props.toggle} color="primary">
              I agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}


export default TermsDialog