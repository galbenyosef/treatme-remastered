import React from 'react'
import Menu from '../Menu/Menu';
import { Textfit } from 'react-textfit';
import { connect } from 'react-redux'
import { CheckCircle } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { fromStrings } from '../Utilities/languageUtils';

const topBar = (props) => {

  const {
    title,
    locale,
    firstname,
    lastname,
    description,
    strings,
    updateUser
  } = props
  console.log(props)
  return(
    <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'darkslateblue',position:'sticky',top:0,zIndex:1}}>
      <div style={{width:'15%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <Menu/>
      </div>
      <div style={{width:'65%',display:'flex',flexDirection:'column',justifyContent:'center',textAlign:'center'}}>
          <Textfit style={{color:'white'}} mode="single">
              {
                `${title.label || ''} ${firstname[locale.symbol] || ''} ${lastname[locale.symbol]  || ''}`
              }
          </Textfit>
          <Textfit style={{color:'deepskyblue'}} mode="single">
              {
                `${description[locale.symbol] || ''}`
              }
          </Textfit>
      </div>
      {
        updateUser ?
        <div style={{display:'flex',alignItems:'center',width:'15%',justifyContent:'center',flexDirection:'column'}}>
          <IconButton onClick={updateUser}>
            <CheckCircle style={{color:'greenyellow'}}/>
          </IconButton>
          <div style={{width:'100%'}}>
          <Textfit style={{color:'greenyellow'}} mode="single">
              {fromStrings(strings,`update-profile`)}
          </Textfit> 
          </div>
        </div>
        :
        <div style={{width:'15%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <p style={{width: '12px', height: '12px', backgroundColor: localStorage.getItem('treatmeUser') ?  'greenyellow':'red'  , borderRadius: '50%'}}/>
            <div style={{width:'100%'}}>
              <Textfit style={{color:'greenyellow'}} mode="single">
                  {fromStrings(strings,`profile-connected`)}
              </Textfit>
            </div>
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const mapStateToProps = state => {
  const {
    title,
    firstname,
    lastname,
    description
  } = state.user

  const {
    strings,
    locale
  } = state.locale

  const {
    titles
  } = state.data

  return {
    titles,
    title,
    firstname,
    lastname,
    locale,
    description,
    strings
  }
}

const connectedTopBar = connect(mapStateToProps,mapDispatchToProps)(topBar)
export { connectedTopBar as TopBar }
