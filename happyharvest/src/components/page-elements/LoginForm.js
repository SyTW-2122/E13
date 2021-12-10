import React from "react";
import "../../index.css";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      user : "",
      passwd : "",
      logged: false,
      loading: false
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
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }
    this.setState({loading: true}).then(
      fetch("10.6.130.90/users/auth", requestOptions).then(response => response.json()).then((e) => {
        this.setState({
          logged: true,
          loading: false
        })
      }).catch((e)=> {
        alert(e);
      })
    )
  }

  render() {

    return (
      <div>
        <h1>{this.state.logged?"Logged In":"Logged Out"}</h1>
        <form className="Login">
          <h2>Introduzca sus datos:</h2>
          <input type="text" placeholder="Usuario" name="user" onChange={this.handleChange}></input>
          <input type="password" placeholder="Contraseña" name= "passwd" onChange={this.handleChange}></input>
          <button type="button" onClick={this.handleClick}>Enviar</button>
          <br></br>
          <p>{this.state.loading?"Espere...":""}</p>
        </form>
      </div>
      
    );
  }
};

export default LoginForm;