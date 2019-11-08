import React, { Fragment } from 'react'
import { Dialog, CircularProgress } from '@material-ui/core'
import { handleCloseAlert } from '../../actions/alertActions';
import { connect } from 'react-redux'

const loadingDialog = (props) => {

    const {text,open,children} = props

    return (
        <Fragment>
            <Dialog open={open}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center',overflow:'hidden'}}>
                    <CircularProgress size={100} />
                    <p style={{margin:'auto'}}>{text} ...</p>
                </div>
            </Dialog>
            {
                children
            }
        </Fragment>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        handleCloseAlert: () => dispatch(handleCloseAlert()),
    }
  }

const mapStateToProps = state => {
    const {message,open} = state.progress
    return {message,open}
}

const connectedLoadingDialog = connect(mapStateToProps,mapDispatchToProps)(loadingDialog)
export { connectedLoadingDialog as LoadingDialog }
