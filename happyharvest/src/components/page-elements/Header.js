import React from "react";

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
            <a href="">Log in</a>
            <a href="">Register</a>
        </nav>
    );
}

export default Header;