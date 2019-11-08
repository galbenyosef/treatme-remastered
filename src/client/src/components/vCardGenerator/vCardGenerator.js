import React from 'react'
import { Checkbox,Input } from '@material-ui/core'
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import regExp from '../Utilities/regExp';
import { fromStrings } from '../Utilities/languageUtils';

/* const fields = ['firstname','lastname','orgnaization','logo','photo','title','url','note','namePrefix','workAddress','gender','cellphone','socialUrls','email']
 */
class vCardGenerator extends React.Component {

    state = {
        mobiles:[],
        emails:[],
    }

    componentDidUpdate(prevProps,prevState){

        if (prevProps.language !== this.props.language){

        }

    }


    toggleCheck = (propertyName,propertyValue) => {

        const {user,dispatch} = this.props

        switch(propertyName){
            case('namePrefix'):
                if (user.vcard.namePrefix)
                    user.vcard.namePrefix = ''
                else
                    user.vcard.namePrefix = propertyValue
                break;
            case('firstname'):
                if (user.vcard.firstName)
                    user.vcard['firstName'] = ''
                else
                    user.vcard['firstName'] = user.firstname || ''
                break;
            case('lastname'):
                if (user.vcard.lastName)
                    user.vcard['lastName'] = ''
                else
                    user.vcard['lastName'] = user.lastname || ''
                break;
            case('description'):
                if (user.vcard['title'])
                    user.vcard['title'] = ''
                else{
                    user.vcard['title'] = user.description || ''
                }
                break;
            case('workUrl'):
                if (user.vcard['workUrl'])
                    user.vcard['workUrl'] = ''
                else
                    user.vcard['workUrl'] = user.buttons.website.data[0]
                break;
            case('note'):
                if (user.vcard['note'])
                    user.vcard['note'] = ''
                else
                    user.vcard['note'] = user.about || ''
                break;
            case('mobile'):
                const mobile = propertyValue
                if (user.vcard['cellPhone'] && user.vcard['cellPhone'].includes(mobile)){
                    user.vcard['cellPhone'].splice(user.vcard['cellPhone'].indexOf(mobile),1)
                }
                else if (user.vcard['cellPhone'] && !user.vcard['cellPhone'].includes(mobile)){
                    user.vcard['cellPhone'].push(mobile)
                }
                else {
                    user.vcard['cellPhone']=[]
                    user.vcard['cellPhone'].push(mobile)
                }
                break;
            case('email'):
                const email = propertyValue
                if (user.vcard['email'] && user.vcard['email'].includes(email)){
                    user.vcard['email'].splice(user.vcard['email'].indexOf(email),1)
                }
                else if (user.vcard['email'] && !user.vcard['email'].includes(email)){
                    user.vcard['email'].push(email)
                }
                else {
                    user.vcard['email']=[]
                    user.vcard['email'].push(email)
                }
                break;
            case('homeAddress'):{
                const location = propertyValue
                if (!user.vcard['homeAddress']){
                    user.vcard['homeAddress'] = {label:'',postalCode:'',city:'',street:''}
                }
                if (user.vcard['homeAddress'].label !== location.name){
                    user.vcard['homeAddress'].label = location.name || ''
                    user.vcard['homeAddress'].postalCode = location.postcode
                    user.vcard['homeAddress'].city = location.city || ''
                    user.vcard['homeAddress'].street = (location.streetname || '') + ' ' + location.streetnumber
                }
                else {
                    if(user.vcard['homeAddress'])
                        user.vcard['homeAddress'].label = ''
                }
                break;
            }
            case('workAddress'):{
                const location = propertyValue
                if (!user.vcard['workAddress']){
                    user.vcard['workAddress'] = {label:'',postalCode:'',city:'',street:''}
                }
                if (user.vcard['workAddress'].label !== location.name){  
                    user.vcard['workAddress'].label = location.name || ''
                    user.vcard['workAddress'].postalCode = location.postcode
                    user.vcard['workAddress'].city = location.city || ''
                    user.vcard['workAddress'].street = (location.streetname || '') + ' ' + location.streetnumber
                }
                else {
                    if(user.vcard['workAddress'])
                        user.vcard['workAddress'].label = ''
                }
                break;
            }
            case('logo'):{
                const logo = propertyValue
                if (user.vcard['logo'] === logo){
                    user.vcard['logo'] = ''
                }
                else {
                    user.vcard['logo'] = propertyValue
                }
                break;
            }
            case('photo'):{
                const logo = propertyValue
                if (user.vcard['photo'] === logo){
                    user.vcard['photo'] = ''
                }
                else {
                    user.vcard['photo'] = propertyValue
                }
                break;
            }
        }

        dispatch({type:'SET VCARD',vcard:user.vcard})

    }


    render(){

        const {user,readonly,strings,language} = this.props
        const { mobiles,emails } = this.state

        user.locations.forEach((location,idx) => {
            if (!mobiles.includes(location.mobile)) {
                location.mobile && mobiles.push(location.mobile)
            }
            if (!emails.includes(location.email)) {
                location.email && emails.push(location.email)
            }
        })

        if (!emails.includes(user.email)) {
            user.email && emails.push(user.email)
        }

        if (!mobiles.includes(user.mobile)) {
            user.mobile && mobiles.push(user.mobile)
        }

        return (
            <div style={{backgroundColor:'white',margin:'10px',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px'}} >
                <ExpansionPanel readonly={readonly} title={fromStrings(strings,`vcard-title`)} fa={'address-card'}>
                {
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>

                        <div key={language} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Checkbox checked={!!user.vcard['namePrefix']} onChange={() => this.toggleCheck('namePrefix',user.title.value)} />
                            <Input disabled={true} value={user.title.value || ''} placeholder={fromStrings(strings,`vcard-namePrefix`)}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Checkbox checked={!!user.vcard['firstName']} onChange={() => this.toggleCheck('firstname')} />
                            <Input disabled={true} value={user.firstname || ''} placeholder={fromStrings(strings,`vcard-firstname`)}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Checkbox checked={!!user.vcard['lastName']} onChange={() => this.toggleCheck('lastname')} />
                            <Input disabled={true} value={user.lastname || ''} placeholder={fromStrings(strings,`vcard-lastname`)}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Checkbox checked={!!user.vcard['title']} onChange={() => this.toggleCheck('description')} />
                            <Input disabled={true} value={user.description || ''} placeholder={fromStrings(strings,`vcard-description`)}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Checkbox checked={!!user.vcard['workUrl']} onChange={() => this.toggleCheck('workUrl')} />
                            <Input disabled={true} value={user.buttons.website.data[0] || ''} placeholder={fromStrings(strings,`vcard-workUrl`)}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Checkbox checked={!!user.vcard['note']} onChange={() => this.toggleCheck('note')} />
                            <Input disabled={true} value={user.about || ''} placeholder={fromStrings(strings,`vcard-note`)}/>
                        </div>
                        {
                            mobiles.map((mobile,idx) => 
                                <div key={idx} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Checkbox checked={user.vcard['cellPhone'] && user.vcard['cellPhone'].includes(mobile)} onChange={() => this.toggleCheck('mobile',mobile)} />
                                    <Input  disabled={true} value={mobile || ''}/>
                                 </div>
                            )
                        }
                        {
                            emails.map((email,idx) => 
                                <div key={idx} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Checkbox checked={user.vcard['email'] &&  user.vcard['email'].includes(email)} onChange={() => this.toggleCheck('email',email)} />
                                    <Input  disabled={true} value={email || ''}/>
                                 </div>
                            )
                        }
                        {
                            user.locations.map((location,idx) => location.name &&
                                <div key={idx} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <span>home<Checkbox checked={user.vcard['homeAddress'] && user.vcard['homeAddress'].label === location.name || false} onChange={() => this.toggleCheck('homeAddress',location)} /></span>
                                    <span>work<Checkbox checked={user.vcard['workAddress'] && user.vcard['workAddress'].label === location.name || false} onChange={() => this.toggleCheck('workAddress',location)} /></span>
                                    <Input disabled={true} value={location.name || ''}/>
                                 </div>
                            )
                        }
                        {
                            user.images.map((img,idx) => !regExp.youtube.test(img) &&
                                <div key={idx} style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <span>logo<Checkbox checked={user.vcard['logo'] === img} onChange={() => this.toggleCheck('logo',img)} /></span>
                                    <span>photo<Checkbox checked={user.vcard['photo'] === img} onChange={() => this.toggleCheck('photo',img)} /></span>
                                    <Input disabled={true} value={`Image #${idx}`}/>
                                 </div>
                            )
                        }
                       
                    </div>
                }
                </ExpansionPanel>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const user = state.user
    const {strings,language} = state.locale
    return {user,strings,language}
}

const connectedvCardGenerator = connect(mapStateToProps)(vCardGenerator);
export {connectedvCardGenerator as VCardGenerator}
