import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import currentUserReducer from './reducers/current-user-reducer';
import { CookiesProvider } from 'react-cookie'
import signUpReducer from './reducers/sign-up-reducer';
import signInReducer from './reducers/sign-in-reducer';
import authReducer from './reducers/auth-reducer';

const allReducers = combineReducers({
  currentUser: currentUserReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  auth: authReducer
}); 

const store = createStore(allReducers, {
  currentUser: {
    username : "",
    fullname : "",
    email : "",
    registration : 0,
    farmElements : {
      cropSpaces : 0,
      animalSpaces : 0,
      currentCrops : [],
      currentAnimals : [],
    },  
    inventory : {
      currentCash : 0,
      cropBoost : 0,
      animalBoost : 0,
      products : []
    }
  },
  signIn: {
    username : "",
    password : "",
    msg: ""
  },
  signUp: {
    username : "",
    password : "",
    email : "", 
    passwordRepeat : "",
    register: false,
    validUser : "",
    validPassword : "",
    validEmail : ""
  },
  auth: {
    authToken: ""
  }
},

window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

); 

ReactDOM.render(
  //<React.StrictMode>
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
