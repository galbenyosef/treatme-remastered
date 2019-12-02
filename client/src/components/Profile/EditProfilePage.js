import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import  { Redirect,Prompt } from 'react-router-dom'
import { getEditPageData } from '../../actions/dataActions';
import About from '../About/About';
import { Settings } from '../Settings/Settings';
import { MediaSwiper } from '../MediaSwiper/MediaSwiper';
import { Languages } from '../Languages/Languages';
import { Locations } from '../Locations/Locations';
import { TopBar } from '../TopBar/TopBar';
import BottomBarBasic from '../BottomBar/BottomBarBasic';
import { Title } from '../Title/Title';
import { Specialities } from '../Specialities/Specialities';
import { Certifications } from '../Certifications/Certifications';
import { SocialNetworks } from '../SocialNetworks/SocialNetworks';
import { VCardGenerator } from '../vCardGenerator/vCardGenerator';
import { MediaDragger } from '../DndTest/MediaDragger';
import { update } from '../../actions/userActions';
import { HMOs } from '../HMOs/HMOs';

class EditProfilePage extends React.Component {

    async componentDidMount() {

        const {getData,locale} = this.props
        if (locale)
            getData(locale._id)

    }

    componentDidUpdate = () => {
     /*    if (shouldBlockNavigation) {
          window.onbeforeunload = () => true
        } else {
          window.onbeforeunload = undefined
        } */
      }

    componentWillReceiveProps = (nextProps,nextState) => {
        const {getData} = this.props
        if (JSON.stringify(nextProps.locale) !== JSON.stringify(this.props.locale)){
            getData(nextProps.locale._id)
        }
    }

    render() {
        const stored = localStorage.getItem('treatmeUser')
        const loggedInUsername = stored ? JSON.parse(stored).username : undefined

        if (!loggedInUsername)
            return <Redirect to={{ pathname: "/login", state: { username: this.props.match.params.username } }}/>

        return (
            <Fragment>
                <div style={{minHeight:'100vh',backgroundImage: 'linear-gradient(darkslateblue, darkslateblue,cyan)',maxWidth:'500px',margin:'auto'}}>
                    <Prompt
                        when={true}
                        message='You have unsaved changes, are you sure you want to leave?'
                        />
                    <TopBar updateUser={() => this.props.update(this.props.user,this.props.locale._id)}/>
                    <div style={{flex:1,display:'flex', flexDirection:'column',justifyContent:'center'}}> 

                        <MediaDragger/>

                        <MediaSwiper/>
                        
                        <Title/>
                        
                       {/*  <Specialities/> */}

                        <Languages/>
                        
                        <Locations />

                        <Certifications />

                        <HMOs />

                        <About />
                        
                        <SocialNetworks />

                        <VCardGenerator/>
        
                        <Settings/>
                    
                    </div>

                </div>                    
                <BottomBarBasic/>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: (locale) => dispatch(getEditPageData(locale)),
        update: (data,localeId) => dispatch(update(data,localeId))
     }
}

function mapStateToProps(state) {
    const user = state.user
    const {locale,strings} = state.locale
    return {user,locale,strings}
}

const connectedEditProfilePage = connect(mapStateToProps,mapDispatchToProps)(EditProfilePage)
export { connectedEditProfilePage as EditProfilePage}
