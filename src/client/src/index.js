import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux'

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/muiTheme'

import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { getStore } from './config/store';
import { MyCustomProvdier } from './components/MyCustomProvider/MyCustomProvider';

ReactDOM.render(
  <StoreProvider store={getStore()}>
    <MuiThemeProvider theme={theme}>
      <MyCustomProvdier>
          <App />
      </MyCustomProvdier>
    </MuiThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
