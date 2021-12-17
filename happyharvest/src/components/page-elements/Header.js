import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    let styles = {
        height: "10%",
        width: "100%",
        backgroundColor: "green",
        color: "white"
    };

    return (
        <nav style= {styles}>
            <h1 style={{margin: "0px"}}>Welcome to HappyHarvest!</h1>
            <NavLink to="/signin">Entrar</NavLink>
            <NavLink to="/signup">Registrarse</NavLink>
        </nav>
    );
}

export default Header;