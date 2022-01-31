import React from "react";
import { NavLink } from "react-router-dom";
import "../../index.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSignUpForm, resetSignUpForm, updateSignUpMessage } from '../../actions/sign-up-actions';

export class SignUpForm extends React.Component {
  constructor() {
    super();
  
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {   
    this.props.onUpdateSignUpForm(e);
  }

  handleClick() { 
    this.props.onUpdateSignUpMessage({
      validUser: "",
      validPassword: "",
      validEmail: ""
    });
    
    let validQuery = true;
    let inputregex = /[^a-z0-9]/i;
    let emailregex = /^([a-z]|\d)+@([a-z]|\d)+(\.([a-z][a-z])+)+/i;
    if(this.props.signUp.username.length <= 5) { 
      this.props.onUpdateSignUpMessage({validUser: "El nombre de usuario debe contener al menos 6 caracteres"});
      validQuery = false;
    }
    
    if(inputregex.test(this.props.signUp.username)){
      this.props.onUpdateSignUpMessage({validUser: "El nombre de usuario no debe contener caracteres especiales"});
      validQuery = false;
    }

    if(this.props.signUp.password.length <= 5) { 
      this.props.onUpdateSignUpMessage({validPassword: "La contraseña debe contener al menos 6 caracteres"});
      validQuery = false;
    }
    if(inputregex.test(this.props.signUp.password)){
      this.props.onUpdateSignUpMessage({validPassword: "La contraseña no debe contener caracteres especiales"});
      validQuery = false;
    }

    if(this.props.signUp.password !== this.props.signUp.passwordRepeat){
      this.props.onUpdateSignUpMessage({validPassword: "La contraseña no coincide"});
      validQuery = false;
    }
    
    if (!emailregex.test(this.props.signUp.email)) {
      this.props.onUpdateSignUpMessage({validEmail: "Introduzca un correo con formato válido: examplemail@example.com"});
      validQuery = false;
    }


    if(validQuery) { 
      let requestOptions = {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ 
          "username": this.props.signUp.username ? String(this.props.signUp.username) : "-",
          "password": this.props.signUp.password ? String(this.props.signUp.password) : "-",
          "email": this.props.signUp.email ? String(this.props.signUp.email) : "-"
        })
      }
//
      fetch("http://10.6.130.90/users", requestOptions).then(response => response.json()).then((e) => {
          console.log(e);
          if(e.type === "res") {
            this.props.onUpdateSignUpForm({
              target: {
                name: "register",
                value: e.register === "true" ? true : false
              }
              
            });

            this.props.onUpdateSignUpMessage({
              validUser: e.validUser ? e.validUser : "",
              validPassword: e.validPassword ? e.validPassword : "",
              validEmail: e.validEmail ? e.validEmail : ""
            });

          } else {
            alert(e.msg)
          }
        }).catch((e)=> {
          alert(e);
      });
    }
  }

  render() {
    let errStyle = {
      color: "red"
    }

    let content = <div>
        <br/>
        <form className="Login">
          <h2>Introduzca sus datos:</h2>
          <input type="text" placeholder="Usuario" name="username" onChange={this.handleChange} />
          <p style={errStyle}>{this.props.signUp.validUser}</p>
          <input type="text" placeholder="Correo electrónico" name= "email" onChange={this.handleChange}/>
          <p style={errStyle}>{this.props.signUp.validEmail}</p>
          <input type="password" placeholder="Contraseña" name= "password" onChange={this.handleChange}/>
          <input type="password" placeholder="Repetir contraseña" name= "passwordRepeat" onChange={this.handleChange}/>
          <p style={errStyle}>{this.props.signUp.validPassword}</p>

          <button type="button" className="greenbutton" onClick={this.handleClick}>Registrarme</button>
          <br></br>
          <p>{this.props.signUp.msg}</p>
        </form>
      </div>

    let login = <div>
        <h1>Usted ha sido registrado satisfactoriamente</h1>
        <NavLink to="/signin"><button>Iniciar sesión</button></NavLink>
      </div>
    return (
      this.props.signUp.register?login:content
    );
  }
}

const mapStateToProps = (state, props) => {
  return ({  
    signUp: state.signUp
  });
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({
    onUpdateSignUpForm: updateSignUpForm,
    onResetSignUpForm: resetSignUpForm,
    onUpdateSignUpMessage: updateSignUpMessage
  }, dispatch); 
}

export default connect(mapStateToProps, mapActionsToProps)(SignUpForm);