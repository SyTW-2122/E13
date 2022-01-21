import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class CropViewer extends React.Component {
  render() {
    return <div></div>
  }
};

const mapStateToProps = (state, props) => {
  return ({

  });
}

const mapActionsToProps = (dispatch, props) => {
  return bindActionCreators({

  }, dispatch); 
}

export default connect(mapStateToProps, mapActionsToProps)(CropViewer);