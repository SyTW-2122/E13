import React from "react";
import Main from "./page-elements/Main";
import { NavLink } from "react-router-dom";


function Homepage(props) {
  let btnStyle = {
    display: "block",
    width: "40%",
    marginLeft: "30%",
    marginBottom: "7vh",
    fontSize: "1.4em",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontWeight: "bold",
    color: "white",
    textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
    backgroundColor: "#AED581"
  }

  let titleStyle = {textAlign: "center", 
    fontSize: "5em", 
    color: "white",
    textShadow: "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000",
  }

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
          <div style={{paddingTop: "80px"}}>
            <h1 style={titleStyle}>Happy Harvest</h1>
            <NavLink to = "/Crops"><button type="button" className="greenbutton" style={btnStyle}>Mis cultivos</button></NavLink>
            <NavLink to = "/Inventory"><button type="button" className="greenbutton" style={btnStyle}>Inventario</button></NavLink>
            <NavLink to = "/Shop"><button type="button" className="greenbutton" style={btnStyle}>Tienda</button></NavLink>
          </div>
        </Main>
      </div>
    );
  }
}

export default Homepage;
