import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { alert,progress } from '../reducers/app.reducer';
import { locale } from '../reducers/locale.reducer';
import { login } from '../reducers/login.reducer';
import { user } from '../reducers/user.reducer';
import { register } from '../reducers/register.reducer';
import { data } from '../reducers/data.reducer';

let store

export const configureStore = () => {

  store = createStore(
    createReducer(),
    applyMiddleware(thunk,createLogger())
  )
  
  store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

}

export const getStore = () => {
  if (!store)
    configureStore()
  return store
}


const createReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers,
    alert,
    data,
    progress,
    locale,
    login,
    register,
    user,
  })
}