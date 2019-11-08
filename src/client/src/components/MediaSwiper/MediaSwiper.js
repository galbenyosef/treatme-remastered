import React, { Fragment } from 'react';
import {KeyboardArrowLeft,KeyboardArrowRight} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux';
import { virtualize } from 'react-swipeable-views-utils';
import regExp from '../Utilities/regExp'

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

class MediaSwiper extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = (index,length) => {

    if (index < 0)
      index = 0
    if (index >= length)
      index = length

    this.setState({
      index
    })
  }

  slideRenderer = (params) => {
    const { key,index } = params
    const { images } = this.props


    if (!images[index])
      return

    if(images[index] && regExp.youtube.test(images[index])){
      return (
        <div  key={index} style={{overflow:'hidden',backgroundColor:'black',width:'100%',display:'flex',alignItems:'center',height:'40vh',justifyContent:'center'}}>
          <div style={{width:'100%',height:'100%',}}>
            <iframe style={{width:'100%',height:'100%'}} src={`${images[index]}?controls=0&rel=0`} frameBorder="0" >
              <p>Your browser does not support iframes.</p>
            </iframe>
            <div style={{position:'absolute', top: 0, left: 0, width:'100%', height:'100%',backgroundColor:'aliceblue',opacity:0.01}}></div>
          </div>
        </div>
      )
    }

    else if (images[index]){
      return (
        <div  key={index} style={{overflowX:'hidden',backgroundColor:'black',width:'100%',display:'flex',alignItems:'center',height:'40vh',justifyContent:'center'}}>
          <img alt={index} style={{maxHeight:'100%',maxWidth:'100%'}} src={images[index]} />
        </div>
      )
    }
    
  }

  render() {
    const { index } = this.state
    const { images } = this.props

    if (!images.length)
      return null

    return (
      <div style={{position:'relative'}}>
        <VirtualizeSwipeableViews slideCount={ images.length } index={ index } onChangeIndex={(index) => this.handleChangeIndex(index,images.length)} slideRenderer={(params) => this.slideRenderer(params)} />
        {
          index !== 0 && 
          <div style={{display:'flex',position:'absolute',top:'calc(50% - 35px)',direction:'ltr',left:0}}>
            <KeyboardArrowLeft name={index} onClick={() => this.handleChangeIndex(index-1,images.length)} style={{margin:'20px 20px',border:'3px solid white',background:'black',borderRadius:'100vh',color:'white'}} />
          </div>
        }
        {
          (images.length && index !== images.length-1) && 
          <div style={{display:'flex',position:'absolute',top:'calc(50% - 35px)',direction:'ltr',right:0}}>
            <KeyboardArrowRight name={index} onClick={() => this.handleChangeIndex(index+1,images.length)} style={{margin:'20px 20px',border:'3px solid white',background:'black',borderRadius:'100vh',color:'white'}} />
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { images } = state.user
  const {language,strings} = state.locale
  return {images,language,strings}
}
const connectedMediaSwiper = connect(mapStateToProps)(MediaSwiper);
export {connectedMediaSwiper as MediaSwiper};
