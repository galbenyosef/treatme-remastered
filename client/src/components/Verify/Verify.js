import React from 'react'
import {verify as _verify} from '../../services/user.service'
import {history} from '../../config/history'
import queryString from 'query-string';

class Verify extends React.Component {


  componentDidMount() {

    const params = queryString.parse(this.props.location.search)
    const {token,username} = params

    if (token){
      _verify(token)
      .then(response => {
        history.replace(`/card/${username}/admin`)
      })
      .catch(err => {
        history.replace(`/login`)
      })
    }
    
  }

  
  render() {
    return null
  }

}

export {Verify}