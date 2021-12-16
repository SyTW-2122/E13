import { json } from "body-parser";
import React from "react";
import "../../index.css";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      user : "",
      passwd : "",
      logged: false,
      msg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if(e.key == "Enter") {
      this.handleClick();
    }
  }

  handleChange(e) {
    
    this.setState((prevState) => {
      prevState[e.target.name] = e.target.value;
    });
  }
  handleClick() {
    let requestOptions = {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": this.state.user?String(this.state.user):"-",
        "passwd": this.state.passwd?String(this.state.passwd):"-"
      })
    }

    let that = this;
    this.setState((_) => {return {loading: true}})
    fetch("http://10.6.130.90/users/auth", requestOptions).then(response => response.json()).then((e) => {
        that.setState({
          logged: (e.logged == "true")?true:false,
          msg: String(e.msg)
        })
      }).catch((e)=> {
        alert(e);
    });
  }

  render() {

    return (
      <div>
        <h1>{this.state.logged?"Logged In":"Logged Out"}</h1>
        <form className="Login">
          <h2>Introduzca sus datos:</h2>
          <input type="text" placeholder="Usuario" name="user" onChange={this.handleChange}></input>
          <input type="password" placeholder="Contraseña" name= "passwd" onChange={this.handleChange} onKeyPress={this.handleKeyPress}></input>
          <button type="button" onClick={this.handleClick}>Enviar</button>
          <br></br>
          <p>{this.state.msg}</p>
        </form>
      </div>
      
    );
  }
};

export default LoginForm;