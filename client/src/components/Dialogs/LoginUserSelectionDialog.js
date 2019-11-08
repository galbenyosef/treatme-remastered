import React from 'react'
import { Dialog,ListItem,ListItemText } from '@material-ui/core'

const loadingDialog = (props) => {

    const {users} = props

    return (
        <Dialog open={users.length > 0}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                {
                    users.map( user =>
                        <ListItem key={user.username} onClick={() => this.setUser(user)}>
                            <ListItemText primary={user.username} />
                        </ListItem>
                    )
                }
            </div>
        </Dialog>
    )

}

export default (loadingDialog)