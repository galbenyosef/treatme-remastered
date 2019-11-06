import React, {Component} from 'react'
import { connect } from 'react-redux'
import regExp from '../Utilities/regExp';
import { addMedia } from '../../actions/userActions';
import  { CloudUpload,CheckCircle,RadioButtonUnchecked } from '@material-ui/icons';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,Input,InputAdornment } from '@material-ui/core'
import { IMAGE_SIZE_LIMIT } from '../Utilities/restrictions';
import { fail } from '../../actions/alertActions';
import { fromStrings } from '../Utilities/languageUtils';



class MediaUploadDialog extends Component  { 
  
  state = {
    youtubeUrl: '',
    youtubeUrlValid: false,
  }

  changeYoutubeUrl = event => {
    const {value} = event.target
    this.setState({
      youtubeUrl:value,
      youtubeUrlValid:regExp.youtube.test(value)
    })
  }

  addYoutube = () => {
    const { closeDialog,addMedia } = this.props
    const { youtubeUrl,youtubeUrlValid } = this.state

    let embedded = youtubeUrl.replace('watch?v=','embed/')
    embedded = embedded.replace('://m.','://www.')

    if (youtubeUrlValid)
      addMedia(embedded)
    
    closeDialog()
    this.setState({url:'',urlValid:false})
  }
  

  handleImageUpload = event => {
    const {files} = event.currentTarget
    const { closeDialog,addMedia } = this.props

    let image = files[0]
    if (image && image.size < IMAGE_SIZE_LIMIT){
      let reader = new FileReader();
      reader.onloadend = function() {
        addMedia(reader.result)
        closeDialog()
      }
      reader.readAsDataURL(image);
    }
    if (image.size >= IMAGE_SIZE_LIMIT){
      fail('Image size too big')
    }
  }
  
  render = () => {

    const {open,strings} = this.props
    const {
      youtubeUrl,
      youtubeUrlValid
    } = this.state

    return (
      <Dialog open={open} onClose={this.props.closeDialog}>
        <DialogTitle>{fromStrings(strings,`mediadialog-selectmethod`)}</DialogTitle>
        <DialogContent>
          <div style={{display:'flex',flexDirection:'column'}}>
            <label style={{padding:'30px'}} htmlFor="upload">
              <span style={{display:'flex',widows:'100%',justifyContent:'center',alignItems:'center'}}><CloudUpload/>Upload image</span>
              <input id="upload" accept="image/*" style={{display:'none'}} type="file" onChange={this.handleImageUpload}/>
            </label>
            <p style={{textAlign:'center'}}>Or</p>
            <Input style={{margin:'30px'}} inputProps={{style:{textAlign:'center'}}} placeholder='Paste YouTube link here' onChange={this.changeYoutubeUrl} value={youtubeUrl}
              startAdornment={
                <InputAdornment>
                  {
                    youtubeUrlValid ? <CheckCircle style={{color:'green'}}/> : <RadioButtonUnchecked style={{color:'red'}}/>
                  }
                </InputAdornment>
              }
            />
          </div>
        </DialogContent>
        {
          youtubeUrlValid &&
          <DialogActions>
            <Button onClick={this.addYoutube} color="primary">
              {fromStrings(strings,`mediadialog-close`)}
            </Button>
          </DialogActions>
        }
      </Dialog>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMedia: media => dispatch(addMedia(media)),
  }
}

function mapStateToProps(state) {
  const { images } = state.user
  const {strings} = state.locale
  return {images,strings}
}
const connectedMediaUploadDialog = connect(mapStateToProps,mapDispatchToProps)(MediaUploadDialog);
export {connectedMediaUploadDialog as MediaUploadDialog};
