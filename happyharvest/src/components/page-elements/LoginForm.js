import React from "react";
import "../../index.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSignInForm, resetSignInForm, updateSignInMessage } from '../../actions/sign-in-actions'
import { setUser, logOut } from '../../actions/user-actions'
import { withCookies } from "react-cookie";
import { setToken } from "../../actions/auth-actions";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if(e.key === "Enter") {
      this.handleClick();
    }
  }

  handleChange(e) {
    this.props.onUpdateSignInForm(e);
  }

  handleClick() {
    const { cookies } = this.props;

    let requestOptions = {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": this.props.signIn.username ? String(this.props.signIn.username) : "-",
        "password": this.props.signIn.password ? String(this.props.signIn.password) : "-"
      })
    }

    fetch("http://10.6.130.90/users/auth", requestOptions).then(response => response.json()).then((e) => {
        if (e.status === "true") {
          this.props.onUpdateSignInMessage("");
          this.props.onSetUser(e);
          if(e.authToken) {
            cookies.set("authToken", e.authToken, {path: "/"}); 
            cookies.set("authUser", e.username, {path: "/"});
            this.props.onSetToken(cookies.get("authToken"));
          }
        } else {
          this.props.onUpdateSignInMessage(e.msg);
        }

      }).catch((e)=> {
        alert(e);
    });
  }

  render() {
    return (
      <form className="Login">
        <h2>Introduzca sus datos:</h2>
        <input type="text" placeholder="Usuario" name="username" onChange={this.handleChange}></input>
        <input type="password" placeholder="Contraseña" name= "password" onChange={this.handleChange} onKeyPress={this.handleKeyPress}></input>
        <button type="button" onClick={this.handleClick}>Enviar</button>
        <br></br>
        <p>{this.props.signIn.msg}</p>
      </form>      
    );
  }
};

const mapStateToProps = (state, props) => {
  return ({
    currentUser: state.currentUser,
    signIn: state.signIn,
    auth: state.auth
  });
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onUpdateSignInForm: updateSignInForm,
    onResetSignInForm: resetSignInForm,
    onUpdateSignInMessage: updateSignInMessage,
    onSetUser: setUser,
    onLogOut: logOut,
    onSetToken: setToken
  }, dispatch); 
}

export default withCookies(connect(mapStateToProps, mapActionsToProps)(LoginForm));