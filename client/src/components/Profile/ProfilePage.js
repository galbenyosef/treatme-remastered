import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getViewPageData } from '../../actions/dataActions';
import About from '../About/About';
import BottomBarExtended from '../BottomBar/BottomBarExtended';
import { MediaSwiper } from '../MediaSwiper/MediaSwiper';
import { SocialButtons } from '../SocialButtons/SocialButtons';
import { Specialities } from '../Specialities/Specialities';
import { Languages } from '../Languages/Languages';
import { Locations } from '../Locations/Locations';
import { Certifications } from '../Certifications/Certifications';
import { TopBar } from '../TopBar/TopBar';
import { HMOs } from '../HMOs/HMOs';

class ProfilePage extends React.Component {

    componentDidMount() {

        const {username} = this.props.match.params
        const { getData,locale } = this.props

        getData(locale._id,username)

    }

    componentWillReceiveProps = (nextProps,nextState) => {
        const {getData} = this.props
        const {username} = this.props.match.params

        if (JSON.stringify(nextProps.locale) !== JSON.stringify(this.props.locale)){
            getData(nextProps.locale._id,username)
        }
    }

    render() {
        const { user } = this.props
        const { images} = user

        return (
            <Fragment>
                <div style={{minHeight:'100vh',backgroundImage: 'linear-gradient(darkslateblue, darkslateblue,cyan)',maxWidth:'500px',margin:'auto'}}>
                    <TopBar/>
                    <div style={{flex:1,display:'flex', flexDirection:'column',justifyContent:'center'}}> 

                        {images.length !== 0 && <MediaSwiper readonly={true} />}

                        <SocialButtons readonly={true}/>

                        <Specialities readonly={true} />

                        <Languages readonly={true}/>
                        
                        <Locations readonly={true}/>

                        <Certifications readonly={true}/>

                        <HMOs readonly={true}/>

                        <About readonly={true}/>
                    </div>
                </div>
                <BottomBarExtended/>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: (localeId,username) => dispatch(getViewPageData(localeId,username)),
    }
}

const mapStateToProps = state => {
    const {user} = state
    const {locale,strings} = state.locale
    return {user,locale,strings}
}

const connectedProfilePage = connect(mapStateToProps,mapDispatchToProps)(ProfilePage)
export {connectedProfilePage as ProfilePage}
