import React from 'react'
import TreeView from 'deni-react-treeview';
import { connect } from 'react-redux';
import {Checkbox, TextField} from '@material-ui/core';
import { addSpeciality,removeSpeciality } from '../../actions/userActions';
import './SpecialitiesTreeStyle.scss'
import {CreateNewFolder,DeleteForever} from '@material-ui/icons/'
import {generateObjectId} from '../Utilities/generateObjectId'

class SpecialitiesTree extends React.Component {

  state = {
    newItems: {}
  }


  componentDidMount = () => {

    if(this.props.readonly)
      return
    const {specialities} = this.props
    for (let i=0;i < specialities.length; i++){
      if (specialities[i].new)
        this.setNewItem(specialities[i].id,specialities[i].value)
    }
    
  }
/*   componentWillReceiveProps = nextProps => {

    if(this.props.readonly)
      return
    if(nextProps.specialitiesData.length && !this.props.specialitiesData.length){
      for (let i=0;i < nextProps.specialitiesData.length; i++){
        if (nextProps.specialitiesData[i].new){
          this.state.newItems[nextProps.specialitiesData[i].id] = nextProps.specialitiesData[i].value
        }
      }
    }
  } */

  setNewItem = (itemId, itemName) => {
    this.state.newItems[itemId] = itemName
  }

  deleteItemClick = (id) => {
    this.refs.treeview.api.removeItem(id);
  }

  handleCheckSpeciality = (event) => {
    const {specialities,addSpeciality,removeSpeciality} = this.props
    const {newItems} = this.state
    const speciality = JSON.parse(event.target.value)

    const specialityExists = specialities.findIndex(spec => spec.id === speciality.id)
    if (specialityExists > -1){
      removeSpeciality(speciality.id)
    }
    else{
      if (speciality.new){
        if (!newItems[speciality.id])
          return
        addSpeciality({id:speciality.id,parent_id:speciality.parent_id,value:newItems[speciality.id],new:true})
      }
      else
        addSpeciality({id:speciality.id,value:speciality.text})
    }

  }

  changeSpecialityText = (event,specialityId) => {
    
    this.setNewItem(specialityId,event.target.value)
    this.setState({})
    
  } 

  onRenderItem = (item, treeview) => {

    const {specialities,removeSpeciality} = this.props
    const {newItems} = this.state
    console.log(item)
    return (
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}} >
        <Checkbox
          checked={!!specialities.find( spec => {
            return spec.id === (item.id)
          })}
          onChange={(e) => this.handleCheckSpeciality(e)}
          value={JSON.stringify(item)}
        />
        {item.new ?  
          <TextField
            disabled={!!specialities.find( spec => spec.id===(item.id))}
            onChange={(e) => this.changeSpecialityText(e,item.id)}
            value={newItems[item.id]}
            margin="none"
          /> :
          <TextField
            disabled
            value={item.text}
            margin="none"
          />
        }
        <span  onClick={  
            () => { 
              let parent_item = treeview.api.findNode(item)
              let nextId = generateObjectId()
              treeview.api.addItem('',true,{id:nextId,parent_id:parent_item && parent_item.id || '',new:true},parent_item);
              this.setNewItem(nextId.toString(), '')
            }
        } >
        <CreateNewFolder/>
        </span>
        {
          item.new &&
          <span  onClick={  
              () => { 
                treeview.api.removeItem(item.id)
                if (newItems[item.id])
                  delete newItems[item.id]
                const specialityExists = specialities.length &&  specialities.findIndex(spec => spec._id===(item.id))
                if (specialityExists > -1){
                  removeSpeciality(item.id)
                }
              }
          } >
          <DeleteForever/>
          </span>
        }
      </div>
    )
  } 

  addItem = (text,isLeaf,parentNode) => {
    this.refs.treeview.api.addItem(text,isLeaf,parentNode);
  }

  findNode = (item) => {
    this.refs.treeview.api.findNode(item);
  }

  findItem = (item) => {
    this.refs.treeview.api.findItem(item);
  }

  getParentNode = (item) => {
    this.refs.treeview.api.getParentNode(item);
  }

  getSelectedItem = () => {
    this.refs.treeview.api.getSelectedItem();
  }

  getRootItem = () => {
    this.refs.treeview.api.getRootItem()
  }

  getItems = () => {
    this.refs.treeview.api.getItems()
  }
  

  render = () =>
  <div className="theme-customization">

    <TreeView
      selectRow={true}
      showIcon={false}
      ref="treeview"
      onRenderItem={this.onRenderItem}
      items={this.props.specialitiesTree} 
      />
      </div>

}

const mapDispatchToProps = dispatch => {
  return {
    addSpeciality: (speciality) => dispatch(addSpeciality(speciality)),
    removeSpeciality: (id) => dispatch(removeSpeciality(id)),
  }
}

function mapStateToProps(state) {
  const {specialities} = state.user
  const {language,strings} = state.locale
  const { specialitiesTree } = state.data
  return {specialities,language,strings,specialitiesTree}
}

const connectedSpecialitiesTree = connect(mapStateToProps,mapDispatchToProps)(SpecialitiesTree);
export {connectedSpecialitiesTree as SpecialitiesTree};