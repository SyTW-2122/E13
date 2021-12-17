import React from "react";
import { redirect } from "statuses";
import "../../index.css";

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username : "",
      password : "",
      email : "",
      passwordRepeat : "",
      logged: false,
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
          "user": this.state.username?String(this.state.username):"-",
          "passwd": this.state.password?String(this.state.password):"-"
        })
      }

      let that = this;
      this.setState((_) => {return {loading: true}})
      /*fetch("http://10.6.130.90/users/auth", requestOptions).then(response => response.json()).then((e) => {
          that.setState({
            logged: (e.logged == "true")?true:false,
            msg: String(e.msg)
          })
        }).catch((e)=> {
          alert(e);
      });*/
    }
  }

  render() {
    let errStyle = {
      color: "red"
    }
    return (
      <div>
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
      
    );
  }
};

export default SignUpForm;