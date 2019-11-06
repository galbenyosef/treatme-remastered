import React from 'react'
import { TextField  } from '@material-ui/core'
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { changeAbout } from '../../actions/userActions';
import { fromStrings } from '../Utilities/languageUtils';


class About extends React.Component {

    render() {

    const {about,readonly,strings,changeAbout} = this.props;

    if (!about && readonly)
        return null

    return (
            <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
                <ExpansionPanel readonly={readonly} title={fromStrings(strings,`about-title`)} fa={'question-circle'}>
                {
                    readonly ?
                    <div style={{margin:'10px',textAlign:'center'}} >
                        {`${about}`}
                    </div>
                    :
                    <div style={{margin:'10px',textAlign:'center'}} >
                        <TextField style={{width:'70%'}} disabled={readonly} multiline type="text" label={fromStrings(`about-write`)} onChange={(e) => changeAbout(e.target.value)} value={about || ''} />
                    </div>
                }
                </ExpansionPanel>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAbout: (value) => dispatch(changeAbout(value))
    }
  }

function mapStateToProps(state) {
    const {about} = state.user
    const {strings,language} = state.locale

    return {about,strings,language}
}

const connectedAbout = connect(mapStateToProps,mapDispatchToProps)(About);
export default (connectedAbout);