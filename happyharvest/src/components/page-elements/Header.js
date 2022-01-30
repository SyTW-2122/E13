import React from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logOut } from '../../actions/user-actions'
import { withCookies } from "react-cookie";
import { setToken } from "../../actions/auth-actions";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let { cookies } = this.props
        this.props.onLogOut();
        this.props.onSetToken("");
        cookies.set("authToken", undefined, {path: "/"}); 
        cookies.set("authUser", undefined, {path:"/"});
    }

    render() {
        let styles = {
            height: "100px",
            width: "100%",
            backgroundColor: "#8BC34A",
            color: "white",
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            
        };

        let h1Style = {margin: "0px", 
            paddingTop: "5px", 
            marginBottom: "0px", 
            marginLeft: "2%", 
            fontSize: "2em", 
            textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"}
        
        let notlogged = <nav style= {styles}>
                <h1 style={h1Style}>¡Bienvenido a HappyHarvest!</h1>
                <br/>
                <NavLink to="/"><button style={{marginLeft: "2%"}}>Home</button></NavLink>
                <NavLink to="/signin"><button>Login</button></NavLink>
                <NavLink to="/signup"><button>Registrarse</button></NavLink>
            </nav>;
        let logged = <nav style= {styles}>
                <h1 style={h1Style}>¡Bienvenido a HappyHarvest!</h1>
                <br/>
                <NavLink to="/"><button style={{marginLeft: "2%"}}>Home</button></NavLink>
                <button type="button" onClick={this.handleClick}>Cerrar sesión</button>
            </nav>;
        
        return(this.props.currentUser.username === "" ? notlogged : logged);
    }
}

const mapStateToProps = (state, props) => {
    return ({
      currentUser: state.currentUser,
      auth: state.auth
    });
  }
  
  const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onLogOut: logOut,
      onSetToken: setToken
    }, dispatch); 
  }
  
  export default withCookies(connect(mapStateToProps, mapActionsToProps)(Header));