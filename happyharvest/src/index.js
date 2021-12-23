import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Header from './components/page-elements/Header';
import Footer from './components/page-elements/Footer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import currentUserReducer from './reducers/current-user-reducer';
import signUpReducer from './reducers/sign-up-reducer';
import signInReducer from './reducers/sign-in-reducer';

const allReducers = combineReducers({
  currentUser: currentUserReducer,
  signIn: signInReducer,
  signUp: signUpReducer
}); 

const store = createStore(allReducers, {
  currentUser: {
    username : "",
    fullname : "",
    email : "",
    registration : ""
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
  }
},

window.devToolsExtension && window.devToolsExtension()

); 

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    <Footer />
    </Router>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
