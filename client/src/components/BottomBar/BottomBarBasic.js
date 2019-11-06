import React from 'react'
import { IconButton  } from '@material-ui/core'
import { connect } from 'react-redux';
import { Language } from '@material-ui/icons';
import FileSaver from 'file-saver'
import vCard from 'vcards-js'
import BottomBar from './BottomBar';
import { TOGGLE_LOCALIZATION_BAR } from '../../actions/constants';

class BottomBarBasic extends React.Component {

    downloadVcard = () => {
        const {vcard,username} = this.props
        var blob = new Blob([Object.assign(vCard(),{...vcard}).getFormattedString()], {type: "text/plain;charset=utf-8"})
        FileSaver.saveAs(blob, `${username}.vcf`)
    }

    render(){

        return (
            <BottomBar>
                <IconButton style={{padding:'0px'}} onClick={() => this.props.dispatch({type:TOGGLE_LOCALIZATION_BAR})}>
                    <Language/>
                </IconButton>
            </BottomBar>
        )

    }

}

function mapStateToProps(state) {
    const {username} = state.login
    return {username}
}

export default connect(mapStateToProps)(BottomBarBasic);
