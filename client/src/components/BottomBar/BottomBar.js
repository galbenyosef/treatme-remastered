import React from 'react'
import {Fragment} from 'react'
import { connect } from 'react-redux';
import LanguageSelectionDrawer from './LanguageSelectionDrawer';

class BottomBar extends React.Component {

    render(){

        const {locales,children} = this.props

        return (
            <Fragment>
                <LanguageSelectionDrawer locales={locales}/>
                <div style={{maxWidth:'500px',display:'flex',justifyContent:'space-around',backgroundColor:'cadetblue',width:'100%',position:'sticky',bottom:0,margin:'auto'}}>
                {
                  children
                }
                </div>
            </Fragment>
        )

        
    }

}

function mapStateToProps(state) {
    const {username,vcard} = state.user
    const {locales} = state.locale
    return {username,vcard,locales}
}

export default connect(mapStateToProps)(BottomBar);
