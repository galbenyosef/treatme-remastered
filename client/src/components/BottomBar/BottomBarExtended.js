import React from 'react'
import { IconButton  } from '@material-ui/core'
import { connect } from 'react-redux';
import { Language } from '@material-ui/icons';
import FileSaver from 'file-saver'
import vCard from 'vcards-js'
import BottomBar from './BottomBar';
import { TOGGLE_LOCALIZATION_BAR } from '../../actions/constants';
import { ShareDialog } from '../Dialogs/ShareDialog';
import config from '../../config/urls'

class BottomBarExtended extends React.Component {

    state = {
        shareDialogOpened: false,
    }


    toggleShareDialog = () => {
        const {shareDialogOpened} = this.state
        this.setState({shareDialogOpened:!shareDialogOpened})
    }
    
    downloadVcard = () => {
        const {vcard,username} = this.props
        var blob = new Blob([Object.assign(vCard(),{...vcard}).getFormattedString()], {type: "text/plain;charset=utf-8"})
        FileSaver.saveAs(blob, `${username}.vcf`)
    }

    render(){

        const {shareDialogOpened} = this.state
        const {username} = this.props

        return (
            <BottomBar>
            {
                <IconButton onClick={this.downloadVcard}>
                    <i className={`fas fa-id-card fa-lg`} style={{lineHeight:1,margin:'auto'}} ></i>
                </IconButton>
            }
                <IconButton onClick={() => this.props.dispatch({type:TOGGLE_LOCALIZATION_BAR})}>
                    <Language/>
                </IconButton>
            {
                <IconButton onClick={this.toggleShareDialog}>
                    <i className={`fas fa-share-alt fa-lg`} style={{lineHeight:1,margin:'auto'}} ></i>
                </IconButton>
            }
            <ShareDialog
                open={shareDialogOpened}
                toggle={this.toggleShareDialog}
                url={process.env.NODE_ENV.trim() === 'development' ? config.devClient: config.client}
                username={username} />
            </BottomBar>
        )
    }

}

function mapStateToProps(state) {
    const {username,vcard} = state.user
    return {username,vcard}
}

export default connect(mapStateToProps)(BottomBarExtended);
