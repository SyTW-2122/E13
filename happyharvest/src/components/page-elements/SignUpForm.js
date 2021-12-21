import React from "react";
import { NavLink } from "react-router-dom";
import "../../index.css";

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username : "",
      password : "",
      email : "",
      passwordRepeat : "",
      register: false,
      validUser : "",
      validPassword : "",
      validEmail : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    
    this.setState((prevState) => {
      prevState[e.target.name] = e.target.value;
    });
  }
  handleClick() {
    this.setState((_) => {return {
      validUser: "",
      validPassword: "",
      validEmail: ""
    }});
    
    let validQuery = true;
    let inputregex = /[^a-z0-9]/i;
    let emailregex = /^([a-z]|[0-9])+@([a-z]|[0-9])+(\.([a-z][a-z])+)+/i;
    if(this.state.username.length <= 5) { 
      this.setState((_) => {return {validUser: "El nombre de usuario debe contener al menos 6 caracteres"}});
      validQuery = false;
    }
    
    if(inputregex.test(this.state.username)){
      this.setState((_) => {return {validUser: "El nombre de usuario no debe contener caracteres especiales"}});
      validQuery = false;
    }

    if(this.state.password.length <= 5) { 
      this.setState((_) => {return {validPassword: "La contraseña debe contener al menos 6 caracteres"}});
      validQuery = false;
    }
    if(inputregex.test(this.state.password)){
      this.setState((_) => {return {validPassword: "La contraseña no debe contener caracteres especiales"}});
      validQuery = false;
    }

    if(this.state.password !== this.state.passwordRepeat){
      this.setState((_) => {return {validPassword: "La contraseña no coincide"}});
      validQuery = false;
    }
    
    if (!emailregex.test(this.state.email)) {
      this.setState((_) => {return {validEmail: "Introduzca un correo con formato válido: examplemail@example.com"}});
      validQuery = false;
    }


    if(!validQuery) {

    } else {
      let requestOptions = {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": this.state.username?String(this.state.username):"-",
          "password": this.state.password?String(this.state.password):"-",
          "email": this.state.email?String(this.state.email):"-"
        })
      }

      let that = this;
      fetch("http://10.6.130.90/users", requestOptions).then(response => response.json()).then((e) => {
          console.log(e);
          if(e.type == "res") {
            that.setState((_) => {
              return { 
                register: e.register,
                validUser: e.validUser?e.validUser:"",
                validPassword: e.validPassword?e.validPassword:"",
                validEmail: e.validEmail?e.validEmail:""
              }
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
        <h1>Registro</h1>
        <form className="Login">
          <h2>Introduzca sus datos:</h2>
          <input type="text" placeholder="Usuario" name="username" onChange={this.handleChange} />
          <p style={errStyle}>{this.state.validUser}</p>
          <input type="text" placeholder="Correo electrónico" name= "email" onChange={this.handleChange}/>
          <p style={errStyle}>{this.state.validEmail}</p>
          <input type="password" placeholder="Contraseña" name= "password" onChange={this.handleChange}/>
          <input type="password" placeholder="Repetir contraseña" name= "passwordRepeat" onChange={this.handleChange}/>
          <p style={errStyle}>{this.state.validPassword}</p>

          <button type="button" onClick={this.handleClick}>Registrarme</button>
          <br></br>
          <p>{this.state.msg}</p>
        </form>
      </div>

    let login = <div>
        <h1>Usted ha sido registrado satisfactoriamente</h1>
        <NavLink to="/signin"><button>Iniciar sesión</button></NavLink>
      </div>
    return (
      this.state.register?login:content
    );
  }
};

export default SignUpForm;