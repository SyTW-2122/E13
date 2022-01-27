import SignIn from './SignIn';
import SignUp from './SignUp';
import Header from './page-elements/Header';
import Footer from './page-elements/Footer';
import Homepage from './Homepage';
import CropViewer from './CropViewer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setToken } from '../actions/auth-actions';
import { withCookies } from 'react-cookie';
import { setUser } from '../actions/user-actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { cookies } = this.props;
    let authToken = cookies.get("authToken");
    let authUser = cookies.get("authUser");
    if(authToken && authUser){
      let requestOptions = {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${authToken}`
        }
      }

      fetch(`http://10.6.130.90/users/${authUser}`, requestOptions).then(response => response.json()).then((e) => {
          if (e.type === "res") {
            this.props.onSetUser(e);
            this.props.onSetToken(cookies.get("authToken"));
          } else {
            cookies.set("authToken", undefined, {path:"/"});
            cookies.set("authUser", undefined, {path:"/"});
          }

        }).catch((e)=> {
          alert(e);
      });
    } else {
      cookies.set("authToken", undefined, {path:"/"});
      cookies.set("authUser", undefined, {path:"/"});
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage props={{username: this.props.currentUser.username}}/>} />
          <Route path="/signin" element={<SignIn props={{username: this.props.currentUser.username}}/>} />
          <Route path="/signup" element={<SignUp props={{username: this.props.currentUser.username}}/>} />
          <Route path="/Crops" element={<CropViewer />} />
        </Routes>
        <Footer />
      </Router>
    );
  }

}


const mapStateToProps = (state, props) => {
  return ({
    auth: state.auth,
    currentUser: state.currentUser
  });
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onSetToken: setToken,
    onSetUser: setUser
  }, dispatch); 
}

export default withCookies(connect(mapStateToProps, mapActionsToProps)(App));
