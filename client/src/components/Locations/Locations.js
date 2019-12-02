import React , {Fragment} from 'react';
import { Add,DeleteForever } from '@material-ui/icons';
import { Button, IconButton, TextField} from '@material-ui/core'
import { connect } from 'react-redux';
import { ExpansionPanel } from '../ExpansionPanel/ExpansionPanel';
import waze from '../../assets/Icons/waze.png'
import { addLocation,removeLocation,changeLocationProp,addDailyOperation,removeDailyOperation,changeDailyOperation } from '../../actions/userActions';
import { fromStrings } from '../Utilities/languageUtils';

const moment = require('moment');

const weekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

class Locations extends React.Component {


  hasDailyOperations = (location) => {
    for (let i=0;i<weekDays.length;i++){
      if (location.daily_operations[weekDays[i]].length)
        return true
      }
      return false
  }

  render() {

    const { 
      locations,
      readonly,
      strings,
      addLocation,
      removeLocation,
      changeLocationProp,
      addDailyOperation,
      removeDailyOperation,
      changeDailyOperation
    } = this.props;
    
    if (!locations.length && readonly)
      return null

    return (
  
      <div style={{backgroundColor:'white',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} >
        <ExpansionPanel readonly={readonly} title={fromStrings(strings,`locations-title`)} fa={'map-marked-alt'}>
        {
          <Fragment>
            {
              locations.map((location,locationIdx) => {
                const locationName = location.name  ? 
                  location.name : `${`${fromStrings(strings,`locations-noname`)} ${locationIdx+1}`}`
                return (
                  <div style={{display:'flex',flexDirection:'column',boxShadow: '2px 2px 5px 2px grey',border: '2px solid',borderRadius:'10px',margin: '10px'}} key={locationIdx}>
                  <ExpansionPanel readonly={readonly} title={locationName} deleteFunction={readonly ? null : () => removeLocation(locationIdx)}>
                  {
                    readonly ? 
                    <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center',alignItems: 'center'}}>
                      {`${location.city}, ${location.streetname} ${location.streetnumber}, ${location.postcode} - ${location.position}`}
                      {
                          location.streetnumber && location.streetname && location.city &&
                          <IconButton style={{height:'48px',padding:'0px',margin:'20px 0px'}} onClick={() => window.location.href=
                              `https://waze.com/ul?q=${ encodeURIComponent( (`${location.streetnumber} ${location.streetname} ${location.city}`).trim() )}`}>
                            <img alt={locationIdx+waze} style={{width:'48px',height:'48px'}} src={waze}/>
                          </IconButton>
                      }
                      {
                        weekDays.map((day,dayIdx) => {
                          return (
                            <div key={`${dayIdx}`} style={{width:'100%',textAlign:'right'}}>
                              <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'flexStart',alignItems: 'center',padding: '0px 20px'}}>
                              {
                                location.daily_operations && location.daily_operations[day].length || !readonly ? `${fromStrings(strings,`locations-${day}`)}` : null
                              }
                              {
                                !readonly &&
                                <IconButton onClick={() => addDailyOperation(locationIdx,day)}>
                                  <Add/>
                                </IconButton>
                              }
                              </div>                                
                              {
                                location.daily_operations[day].map((hour,hourIdx) => {
                                  return (
                                    <div key={hourIdx} style={{display:'flex',flexDirection:'row'}}>
                                    {
                                      !readonly && 
                                      <IconButton 
                                        onClick={() => removeDailyOperation(locationIdx,day,hourIdx)}>
                                        <DeleteForever/>
                                      </IconButton>
                                    }
                                      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',width:'100%',alignItems:'center'}}>
                                        <TextField
                                          disabled={readonly}
                                          label={`משעה`}
                                          type="time"
                                          value={moment(location.daily_operations[day][hourIdx]['from']).format('HH:mm') || '00:00'}
                                          InputLabelProps={{style:{width:'100%',textAlign:'center'}}}
                                          inputProps={{step: 300}}
                                          onChange={(event) => changeDailyOperation(locationIdx,day,hourIdx,event.currentTarget.value,true,false)}/>
                                        <TextField
                                          disabled={readonly}
                                          label={`עד שעה`}
                                          type="time"
                                          value={moment(location.daily_operations[day][hourIdx]['to']).format('HH:mm') || '00:00'}
                                          InputLabelProps={{style:{width:'100%',textAlign:'center'}}} inputProps={{step: 300}}
                                          onChange={(event) => changeDailyOperation(locationIdx,day,hourIdx,event.currentTarget.value,false,true)}/>
                                      </div>
                                  </div>
                                  )
                                })
                              }
                            </div>
                          )})
                        }
                    </div>
                    :
                    <div>
                      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
                        {
                          location.streetnumber && location.streetname && location.city &&
                          <IconButton style={{height:'48px',width:'45%',padding:'0px',margin:'20px 0px'}} onClick={() => window.location.href=
                              `https://waze.com/ul?q=${ encodeURIComponent( (`${location.streetnumber} ${location.streetname} ${location.city}`).trim() )}`}>
                            <img alt={locationIdx+waze} style={{width:'48px',height:'48px'}} src={waze}/>
                          </IconButton>
                        }
                        { 
                          <TextField 
                            inputProps={{style:{textAlign:'center'}}}
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            name="name"
                            type="text" 
                            label={fromStrings(strings,`locations-name`)}
                            value={location.name}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                        { 
                          <TextField
                            inputProps={{style:{textAlign:'center'}}} 
                            disabled={readonly} style={{width:'45%',margin:'20px 0px'}}
                            name="position"
                            type="text"
                            label={fromStrings(strings,`locations-position`)}
                            value={location.position}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                        { 
                          <TextField 
                            inputProps={{style:{textAlign:'center'}}}
                            disabled={readonly} style={{width:'45%',margin:'20px 0px'}}
                            name="postcode"
                            type="number"
                            label={fromStrings(strings,`locations-postcode`)}
                            value={location.postcode}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                        { 
                          <TextField
                            inputProps={{style:{textAlign:'center'}}} 
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            name="city"
                            type="text"
                            label={fromStrings(strings,`locations-city`)}
                            value={location.city}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                        { 
                          <TextField
                            inputProps={{style:{textAlign:'center'}}} 
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            name="streetname"
                            type="text"
                            label={fromStrings(strings,`locations-streetname`)}
                            value={location.streetname}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                        { 
                          <TextField
                            inputProps={{style:{textAlign:'center'}}}
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            name="streetnumber"
                            type="number"
                            label={fromStrings(strings,`locations-streetnumber`)}
                            value={location.streetnumber}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                        { 
                          <TextField
                            inputProps={{style:{textAlign:'center'}}}
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            name="email"
                            type="text"
                            label={fromStrings(strings,`locations-email`)}
                            value={location.email}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                        { 
                          <TextField
                            inputProps={{style:{textAlign:'center'}}}
                            disabled={readonly}
                            style={{width:'45%',margin:'20px 0px'}}
                            name="mobile"
                            type="text"
                            label={fromStrings(strings,`locations-mobile`)}
                            value={location.mobile}
                            onChange={(e) => changeLocationProp(locationIdx,e.target)}/>
                        }
                      </div>
                      
                      {
                        (!readonly || (readonly && this.hasDailyOperations(location))) &&
                        <ExpansionPanel title={fromStrings(strings,`locations-viewschedule`)} >
                        {
                          
                          <div>
                            {
                              weekDays.map((day,dayIdx) => {
                                return (
                                  <div key={`${dayIdx}`} style={{width:'100%',textAlign:'right'}}>
                                    <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'flexStart',alignItems: 'center',padding: '0px 20px'}}>
                                    {
                                      location.daily_operations[day].length || !readonly ? `${fromStrings(strings,`locations-${day}`)}` : null
                                    }
                                    {
                                      !readonly &&
                                      <IconButton onClick={() => addDailyOperation(locationIdx,day)}>
                                        <Add/>
                                      </IconButton>
                                    }
                                    </div>                                
                                    {
                                      location.daily_operations[day].map((hour,hourIdx) => {
                                        return (
                                          <div key={hourIdx} style={{display:'flex',flexDirection:'row'}}>
                                          {
                                            !readonly && 
                                            <IconButton 
                                              onClick={() => removeDailyOperation(locationIdx,day,hourIdx)}>
                                              <DeleteForever/>
                                            </IconButton>
                                          }
                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',width:'100%',alignItems:'center'}}>
                                              <TextField
                                               disabled={readonly}
                                               label={`משעה`}
                                               type="time"
                                               value={moment(location.daily_operations[day][hourIdx]['from']).format('HH:mm') || '00:00'}
                                               InputLabelProps={{style:{width:'100%',textAlign:'center'}}}
                                               inputProps={{step: 300}}
                                               onChange={(event) => changeDailyOperation(locationIdx,day,hourIdx,event.currentTarget.value,true,false)}/>
                                              <TextField
                                                disabled={readonly}
                                                label={`עד שעה`}
                                                type="time"
                                                value={moment(location.daily_operations[day][hourIdx]['to']).format('HH:mm') || '00:00'}
                                                InputLabelProps={{style:{width:'100%',textAlign:'center'}}} inputProps={{step: 300}}
                                                onChange={(event) => changeDailyOperation(locationIdx,day,hourIdx,event.currentTarget.value,false,true)}/>
                                           </div>
                                        </div>
                                        )
                                      })
                                    }
                                  </div>
                                )
                              })
                            }
                          </div>
                          }
                        </ExpansionPanel>
                      }
                    </div>
                  }
                  </ExpansionPanel>
                </div>
                )
              })
            }
            {
              !readonly && 
              <div style={{margin:'10px',textAlign:'center'}} >
                <Button style={{boxShadow: 'darkcyan 0px 0px 10px 5px',borderRadius: '50px', margin: '20px auto'}} onClick={() => addLocation()}>{fromStrings(strings,`locations-add`)}</Button>
              </div>
            } 
          </Fragment>
        }
        </ExpansionPanel>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLocation: () => dispatch(addLocation()),
    removeLocation: (location) => dispatch(removeLocation(location)),
    changeLocationProp: (index,target) => dispatch(changeLocationProp(index,target)),
    addDailyOperation: (locationIdx,dayIdx) => dispatch(addDailyOperation(locationIdx,dayIdx)),
    removeDailyOperation: (locationIdx,dayIdx,hourIdx) => dispatch(removeDailyOperation(locationIdx,dayIdx,hourIdx)),
    changeDailyOperation: (locationIdx,dayIdx,hourIdx,time,from,to) => dispatch(changeDailyOperation(locationIdx,dayIdx,hourIdx,time,from,to))
   }
}

function mapStateToProps(state) {
  const {locations} = state.user
  const {strings,language} = state.locale

  return {locations,strings,language}
}

const connectedLocations = connect(mapStateToProps,mapDispatchToProps)(Locations);
export { connectedLocations as Locations}
