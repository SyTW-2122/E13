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
          crops.push(<FarmElement key = {String(i)} />);
        }
      }
      console.log(crops)
      return <div>
        <Main>
          <NavLink to = "/"><button>Volver</button></NavLink>
          {crops}
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