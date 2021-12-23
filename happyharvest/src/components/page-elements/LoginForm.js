import React from "react";
import "../../index.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSignInForm, resetSignInForm, updateSignInMessage } from '../../actions/sign-in-actions'
import { setUser, logOut } from '../../actions/user-actions'

class LoginForm extends React.Component {
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
    let requestOptions = {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": this.props.signIn.username?String(this.props.signIn.username):"-",
        "password": this.props.signIn.password?String(this.props.signIn.password):"-"
      })
    }

    let that = this;
    fetch("http://10.6.130.90/users/auth", requestOptions).then(response => response.json()).then((e) => {
        that.setState({
          logged: (e.logged === "true")?true:false,
          msg: String(e.msg)
        })
        
        if (e.status === "true") {
          this.props.onUpdateSignInMessage("");
          this.props.onSetUser(e);
        } else {
          this.props.onUpdateSignInMessage(e.msg);
        }

      }).catch((e)=> {
        alert(e);
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentUser.username === "" ? "Logged Out" : "Logged In"}</h1>
        <form className="Login">
          <h2>Introduzca sus datos:</h2>
          <input type="text" placeholder="Usuario" name="username" onChange={this.handleChange}></input>
          <input type="password" placeholder="Contraseña" name= "password" onChange={this.handleChange} onKeyPress={this.handleKeyPress}></input>
          <button type="button" onClick={this.handleClick}>Enviar</button>
          <br></br>
          <p>{this.props.signIn.msg}</p>
        </form>
      </div>
      
    );
  }
};

const mapStateToProps = (state, props) => {
  return ({
    currentUser: state.currentUser,
    signIn: state.signIn
  });
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onUpdateSignInForm: updateSignInForm,
    onResetSignInForm: resetSignInForm,
    onUpdateSignInMessage: updateSignInMessage,
    onSetUser: setUser,
    onLogOut: logOut
  }, dispatch); 
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);