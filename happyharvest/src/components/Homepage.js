import React from "react";
import Main from "./page-elements/Main";
import { NavLink } from "react-router-dom";


function Homepage(props) {
  if(props.props.username === ""){
    return(
      <Main>
        <br />
        <div className="Welcome">
          <h1> ¡Bienvenido a HappyHarvest! </h1>
          <p>Actualmente no se encuentra registrado, por favor, cree una cuenta. En caso de tener una cuenta inicie sesión.</p>
          <NavLink to="/signin"><button>Login</button></NavLink>
          <NavLink to="/signup"><button>Registro</button></NavLink>
        </div>
      </Main>
    );
  } else {
    return (
      <div>
        <Main>
          <h1>Happy Harvest</h1>
          <NavLink to = "/Crops"><button>Mis cultivos</button></NavLink>
        </Main>
      </div>
    );
  }
}

export default Homepage;
