import React from 'react'
import './App.css';
import { Router } from '../../routes/Router';
import '../../styles/devices.min.css'
import { initLocales } from '../../actions/localeActions';
import { connect } from 'react-redux';
import { history } from '../../config/history';

class App extends React.Component{

  componentDidMount = () => {

    const {initLocales} = this.props

    initLocales()

  }

  render = () => <Router/>
  
}

const mapDispatchToProps = dispatch => {

  return {
    initLocales: () => dispatch(initLocales())
  }

}

export default connect (null,mapDispatchToProps)(App)
