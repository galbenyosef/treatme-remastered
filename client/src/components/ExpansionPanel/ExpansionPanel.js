import React, {Fragment} from 'react'
import { DeleteForever } from '@material-ui/icons';

const iconPlus = `fas fa-plus fa-lg expandIconStyle`
const iconMinus = `fas fa-minus fa-lg expandIconStyleExpanded`

export class ExpansionPanel extends React.Component {

    state = {
        expanded : false
    }
    
    toggleExpand = () => {
        this.setState({
          expanded: !this.state.expanded
        })
    }


    render(){

        const { fa, title, readonly, children, deleteFunction } = this.props
        const { expanded } = this.state

        return (
            <Fragment>
                <div onClick={() => this.setState({expanded:!expanded})} style={{display:'flex',justifyContent:'space-between',padding:'10px 15px',flexDirection:'row-reverse'}}>
                    {
                        deleteFunction ?  
                        <DeleteForever style={{margin:'auto 0px',width:'10%'}} onClick={deleteFunction}/>
                        :
                        fa ?
                        <i className={`fas fa-${fa} fa-lg`} style={{lineHeight:1,margin:'auto 0px',width:'10%'}}></i>
                        :
                        <i style={{width:'10%'}}/>

                    }
                    <p style={{margin:'auto',width:'80%',textAlign:'center'}}>{title}</p>
                    {
                        readonly ? <i style={{width:'10%'}}/> :
                            expanded ? 
                            (<div style={{width:'10%'}}><i style={{margin:'auto 0px'}} className={iconMinus}/></div>) 
                            : 
                            (<div style={{width:'10%'}}><i style={{margin:'auto 0px'}} className={iconPlus}/></div>) 
                    }
                </div>
                {
                    (readonly || expanded) && children
                }
            </Fragment>
        )
    }

}

