import React, { PureComponent } from 'react';
import { DragDropContext } from 'react-dnd';
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import objectAssign from 'object-assign';
import { MediaUploadDialog } from '../Dialogs/MediaUploadDialog';
import { IMAGES_MAX } from '../Utilities/restrictions';
import Source from './Source';
import { AddCircleOutline, DeleteForever } from '@material-ui/icons';
import { Target } from './Target';
import { connect } from 'react-redux';
import regExp from '../Utilities/regExp';
import { removeMedia,replaceMedia } from '../../actions/userActions';
import { fromStrings } from '../Utilities/languageUtils';

class MediaDragger extends PureComponent {

  state = {
    mediaUploadDialogOpened: false
  }

  openDialog = () => {
    this.setState({mediaUploadDialogOpened:true})
  }

  closeDialog = () => {
    this.setState({mediaUploadDialogOpened:false})
  }

  generatePreview(type, item, style) {
    objectAssign(style, {backgroundColor: item.color, width: '50px', height: '50px'});
    return <div style={style}>Preview</div>;
  }

  renderMedia = (media) => {

    if(media && regExp.youtube.test(media)){
      return (
        <div style={{position: 'relative',width:'100%',height:'100%',}}>
          <iframe style={{width:'100%',height:'100%'}} src={`${media}?controls=0&rel=0`} frameBorder="0" >
            <p>Your browser does not support iframes.</p>
          </iframe>
          <div style={{position:'absolute', top: 0, left: 0, width:'100%', height:'100%',backgroundColor:'aliceblue',opacity:0.01}}></div>
      </div>
      )
    }

    else if (media){
      return (
        <div style={{backgroundColor:'black',width:'100%',display:'flex',alignItems:'center',height:'40vh',justifyContent:'center'}}>
          <img style={{height:'100%',width:'100%'}} src={media} />
          </div>
      )
    }
  }

  renderImageSources = (IMAGES_MAX) => {

    const {strings,images,replaceMedia} = this.props
    let container = []

    for (let i=0; i< IMAGES_MAX; i++){

      container.push (

        images[i] ?
        <Target replaceMedia={replaceMedia} index={i+1} key={i}>
          <Source index={i+1}>
            <label style={{height:'100%'}}>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
              {
                this.renderMedia(images[i])
              }
              </div>
            </label>    
          </Source>
        </Target>
        :
        <div style={{height:'45%',width:'30%',border:'1px solid black'}} key={i}>
          <label style={{height:'100%'}} onClick={this.openDialog}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
              <AddCircleOutline />
              <p style={{margin:0,textAlign:'center'}}>{`${fromStrings(strings,`media-upload`)} ${i+1}`}</p>
            </div>
          </label>    
        </div>
      )
    }

    return container

  }

  render() {
    const {mediaUploadDialogOpened} = this.state
    const {removeMedia} = this.props

    return (
      <div style={{height:'35vh',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',padding:'20px'}}>
        {
          this.renderImageSources(IMAGES_MAX)
        }
        <Target removeMedia={removeMedia} index={0}>
          <DeleteForever/>
        </Target>
        <Preview generator={this.generatePreview} />
        <MediaUploadDialog open={mediaUploadDialogOpened} closeDialog={this.closeDialog} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeMedia: mediaIdx => dispatch(removeMedia(mediaIdx)),
    replaceMedia: (sourceMedia,targetMedia) => dispatch(replaceMedia(sourceMedia,targetMedia))
  }
}

function mapStateToProps(state) {
  const { images } = state.user
  const {strings} = state.locale
  return {images,strings}
}

const MediaDraggerWrapper = connect(mapStateToProps,mapDispatchToProps)(DragDropContext(MultiBackend(HTML5toTouch))(MediaDragger));
export {MediaDraggerWrapper as MediaDragger};

