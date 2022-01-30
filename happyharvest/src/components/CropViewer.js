import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FarmElement from "./FarmElement";
import Main from "./page-elements/Main";
import { Navigate, NavLink } from "react-router-dom";

export class CropViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentUser.username === "") {
      return <Navigate to = "/"/>
    } else {
      let crops = [];
      for (let i = 0; i < this.props.currentUser.farmElements.cropSpaces; i++) {
        if (this.props.currentUser.farmElements.currentCrops[i]) {
          crops.push(<FarmElement elementInfo = {{...this.props.currentUser.farmElements.currentCrops[i]}} id = {String(i)} key = {String(i)} />);
        } else {
          crops.push(<FarmElement seeds = {this.props.currentUser.inventory.seeds} key = {String(i)} />);
        }
      }
      console.log(crops)
      return <div>
        <Main>
          <div style={{width: "90%", marginLeft: "5%", paddingTop: "20px"}}>
            <NavLink to = "/"><button style={{marginBottom: "60px"}}>Volver</button></NavLink>
            <h1>Zona de cultivo</h1>
            {crops}
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

export default connect(mapStateToProps, mapActionsToProps)(CropViewer);