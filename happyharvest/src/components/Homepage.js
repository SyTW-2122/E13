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
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Main>
      </div>
    );
  }
}

export default Homepage;
