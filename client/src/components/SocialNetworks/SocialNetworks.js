import React, { Component, Fragment } from 'react'
import call from '../../assets/Icons/call.png'
import facebook from '../../assets/Icons/facebook.png'
import gmail from '../../assets/Icons/gmail.png'
import googleplus from '../../assets/Icons/googleplus.png'
import instagram from '../../assets/Icons/instagram.png'
import linkedin from '../../assets/Icons/linkedin.png'
import messenger from '../../assets/Icons/messenger.png'
import pinterest from '../../assets/Icons/pinterest.png'
import skype from '../../assets/Icons/skype.png'
import sms from '../../assets/Icons/sms.png'
import snapchat from '../../assets/Icons/snapchat.png'
import telegram from '../../assets/Icons/telegram.png'
import twitter from '../../assets/Icons/twitter.png'
import waze from '../../assets/Icons/waze.png'
import website from '../../assets/Icons/website.png'
import whatsapp from '../../assets/Icons/whatsapp.png'
import youtube from '../../assets/Icons/youtube.png'

import { Select,MenuItem,IconButton,Input,Checkbox } from '@material-ui/core'
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import { fromStrings } from '../Utilities/languageUtils';

const icons = {

    call,
    facebook,
    gmail,
    googleplus,
    instagram,
    linkedin,
    messenger,
    pinterest,
    skype,
    sms,
    snapchat,
    telegram,
    twitter,
    waze,
    website,
    whatsapp,
    youtube,

}
var uniqEs6 = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) === pos
    })
}

class populatedSelection extends Component {


    state = {
        customPlatformInput: ''
    }

    changeCustomPlatformInput = (event) => {
        const {value} = event.target
        this.setState({customPlatformInput:value})
    }

    toggleSelectValue = event => {

        const {name,value} = event.target
        const platform = name
        const { dispatch,buttons } = this.props

        let newButtons = {...buttons}

        const buttonData = newButtons[platform].data


        if (platform === 'waze')
        {
            let locationIndex = buttonData.findIndex(location => location === value)      
            if (locationIndex !== -1){
                buttonData.splice(locationIndex,1);
            }
            else
                buttonData.push(value)
        }
        else{
            if (buttonData.includes(value)){
                let idxToRemove = buttonData.indexOf(value);
                buttonData.splice(idxToRemove,1);
            }
            else
                buttonData.push(value)
            
        }


        dispatch({type:'SET BUTTONS',buttons:newButtons})
    }

    addCustomToPlatform = (platformName) => {
        
        const {customPlatformInput} = this.state
        if (!platformName || !customPlatformInput)
            return
        const target = {name:platformName,value:customPlatformInput}

        this.toggleSelectValue({target})

    }

    render = () => {
        let {platform,locations,email,mobile,buttons} = this.props
        let container = [];


        if (platform === 'waze'){
            locations.forEach(location => container.push(JSON.stringify(location)))
        }

        else if (platform === 'sms' || platform === 'whatsapp' || platform === 'call'){
            locations.forEach(location => location.mobile && container.push(location.mobile))
            container.push(mobile)
        }
        else if (platform === 'gmail'){
            locations.forEach(location => location.email && container.push(location.email))
            container.push(email)
        }


        if (platform !== 'waze')
            container = uniqEs6(container.concat(buttons[platform].data))

        if (platform === 'waze'){
            return (
                <Select style={{width:'50%'}} displayEmpty multiple value={buttons[platform].data.map( val => JSON.stringify(val))}
                    renderValue=
                    {
                        selected => selected.map((value,idx) =>  <p style={{fontSize:'10px'}} key={idx}>{value}</p>)
                    }>
                    {
                        container.map((value,index) => (
                            <MenuItem key={index}>
                                <Fragment>
                                <Checkbox inputProps={{style:{width:'100%',height:'100%'}}} name={platform} value={value} onChange={this.toggleSelectValue} checked={buttons[platform].data && buttons[platform].data.includes(value)}/>
                                {JSON.stringify(value)}</Fragment>
                            </MenuItem>)
                        )
                    }
                </Select>
            )
        }

        return (
            <Select style={{width:'50%'}} displayEmpty multiple value={buttons[platform].data}
                renderValue=
                {
                    selected => { 
                        return <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}> 
                            {
                                selected.map(value => <p style={{fontSize:'10px'}} key={value}>{value}</p>)
                            }
                        </div>     
                    }
                }
            >
                {
                    container.map((value,index) => (
                        <MenuItem key={index}>
                            <Checkbox inputProps={{style:{width:'100%',height:'100%'}}} name={platform} value={value} onChange={this.toggleSelectValue} checked={buttons[platform].data && buttons[platform].data.includes(value)}/>
                            {value}
                        </MenuItem>)
                    )
                }

                {
                    <MenuItem>
                        <IconButton onClick={() => this.addCustomToPlatform(platform)}>
                            <i className={`fas fa-plus fa-lg`} style={{lineHeight:1,margin:'auto'}} ></i>
                        </IconButton>
                        <Input name={platform} onChange={this.changeCustomPlatformInput} />
                    </MenuItem>
                }
            </Select>
        )
    }
    

}

function mapStateToPropsPopulatedSelection(state) {
    const {email,mobile,locations,buttons} = state.user
    return {email,mobile,locations,buttons}
}

const PopulatedSelection = connect(mapStateToPropsPopulatedSelection)(populatedSelection)

class SocialNetworks extends React.Component {

    handleCheck = event => {

        const {name} = event.target
        const platform = name
        const { dispatch,buttons } = this.props

        let newButtons = {...buttons}

        let checked = 0 
        Object.keys(buttons).forEach(button => buttons[button].checked && checked++)

        if (checked > 8){
            if (newButtons[platform].checked)
                newButtons[platform].checked = !newButtons[platform].checked
            else{
                dispatch({type:'FAIL',message:'Maximum 9 allowed'})
                return
            }
        }
        else {
            if (newButtons[platform].data.length)
                newButtons[platform].checked = !newButtons[platform].checked
        }

        dispatch({type:'SET BUTTONS',buttons:newButtons})
    }

    render(){
        const { buttons,strings} = this.props

        return (
            <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
                <ExpansionPanel title={fromStrings(strings,`social-title`)}fa={'bezier-curve'}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        {
                        Object.keys(buttons).map((platform,idx) => {
                                return (
                                    <div key={platform} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                        <img alt={platform} style={{width:'64px',height:'64px'}} src={icons[platform]}/>
                                        <p style={{width:'20%'}}>
                                            {fromStrings(strings,`social-${platform}`)}
                                        </p>
                                        {
                                            <PopulatedSelection platform={platform}/>
                                        }
                                        <Checkbox name={platform} checked={buttons[platform].checked} onChange={this.handleCheck} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </ExpansionPanel>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {buttons} = state.user
    const {strings} = state.locale

    return {buttons,strings}
}

const connectedSocialNetworks = connect(mapStateToProps)(SocialNetworks)
export { connectedSocialNetworks as SocialNetworks}