import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from "./page-elements/Main";
import { Navigate, NavLink } from "react-router-dom";

export class Inventory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentUser.username === "") {
      return <Navigate to = "/"/>
    } else {
      let elements = [];
      for (let i = 0; i < this.props.currentUser.inventory.products.length; i++) {
        elements.push(<div style = {{width:"100%", minHeight:"30vh", display:"flex", borderTopStyle: "solid", marginBottom: "30px"}}>
            <div style = {{width: "50%", 
                height:"100px", 
                margin: "10px"}}>
                <h3>{`${this.props.currentUser.inventory.products[i][1].name}`}</h3>
                <p>Cantidad disponible: {`${this.props.currentUser.inventory.products[i][0]}`}</p>
                <p>Precio de venta: {`${this.props.currentUser.inventory.products[i][1].sellPrice}`}</p>
            </div>
            <div style = {{width: "50%", 
                height:"100px", 
                margin: "10px"}}>
                <img src={this.props.currentUser.inventory.products[i][1].icon.src} alt="" style={{
                    width: "auto",
                    height: "25vh",
                    marginLeft: "25%"
                }}></img>
            </div>
            
        </div>)
      }
      
      return <div>
        <Main>
            <div style={{width: "90%", marginLeft: "5%", paddingTop: "20px"}}>
                <NavLink to = "/"><button>Volver</button></NavLink>
                <br/>
                <h1>Inventario</h1>
                <h2>Elementos básicos</h2>
                <p>Saldo del usuario: {`${this.props.currentUser.inventory.currentCash}`}</p>
                <p>Fertilizante: {`${this.props.currentUser.inventory.cropBoost}`} unidades</p>
                <p>Comida para animales: {`${this.props.currentUser.inventory.animalBoost}`} unidades</p>
                <br/>
                <h2>Cultivos</h2>
                {elements}
            </div>
        </Main>
      </div>
    }
    
  }
}

const mapStateToProps = (state, props) => {
  return ({
    currentUser: state.currentUser
  });
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({

  }, dispatch); 
}

export default connect(mapStateToProps, mapActionsToProps)(Inventory);