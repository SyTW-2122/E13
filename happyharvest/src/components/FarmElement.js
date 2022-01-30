import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser, logOut } from '../actions/user-actions'
import { withCookies } from "react-cookie";
import { setToken } from "../actions/auth-actions";

export class FarmElement extends React.Component {
    constructor(props) {
        super(props);
        this.harvestCrop = this.harvestCrop.bind(this);
        this.growCrop = this.growCrop.bind(this);
        this.updateSel = this.updateSel.bind(this);
        this.selection = "";
    }

    updateSel(e) {
        this.selection = e.target.value;
    }
    harvestCrop() {
        let producedAt = this.props.elementInfo.lastProduction + (1000 * 60 * 60 * this.props.elementInfo.cycleTime)
        let rightNow = new Date().getTime();
        if( producedAt <= rightNow){
            
            let requestOptions = {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${this.props.auth.authToken}`
                }
            }

            console.log("*Hacker voice: Im in")
            console.log(this.props.id)
            fetch(`http://10.6.130.90/users/${this.props.currentUser.username}/Crops?position=${this.props.id}`, requestOptions).then(response => response.json()).then((e) => {         
                if(e.type == "res" && e.msg == "OK") {
                    fetch(`http://10.6.130.90/users/${this.props.currentUser.username}`, requestOptions).then(response => response.json()).then((e) => {
                        if (e.type === "res") {
                            this.props.onSetUser(e);
                          } else {
                            this.props.onLogOut();
                          }
                    })
                } else if (e.type == "res"){
                    alert(e.msg)
                } else {
                    console.log(e)
                    //throw new Error("Unexpected response")
                }
            }).catch((e)=> {
                console.log(e);
                this.props.onLogOut();
            }); 
        }  
    }

    growCrop(e) {
        if(this.selection !== ""){
            let requestOptions = {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${this.props.auth.authToken}`
                }
            }
    
            let secondRequestOptions = {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${this.props.auth.authToken}`
                }
            }
    
            fetch(`http://10.6.130.90/users/${this.props.currentUser.username}/Crops?type=${this.selection}`, requestOptions).then(response => response.json()).then((e) => {
                if(e.type == "res" && e.msg == "OK") {
                    fetch(`http://10.6.130.90/users/${this.props.currentUser.username}`, secondRequestOptions).then(response => response.json()).then((e) => {
                        if (e.type === "res") {
                            this.props.onSetUser(e);
                          } else {
                            this.props.onLogOut();
                          }
                    })
                } else if (e.type == "res"){
                    alert(e.msg)
                } else {
                    throw new Error("Unexpected response")
                }
            }).catch((e)=> {
                console.log(e);
                this.props.onLogOut();
            }); 
        }
    } 

    render() {  
        if (this.props.elementInfo) {
            let auxDate = new Date(this.props.elementInfo.lastProduction);
            let auxDate2 = new Date(this.props.elementInfo.lastProduction + (1000 * 60 * 60 * this.props.elementInfo.cycleTime));
            let readybutton = <p>En proceso de cultivo...</p>
            if(auxDate2.getTime() < new Date().getTime()) {
                readybutton = <button onClick={this.harvestCrop}>Cosechar</button>
            }
            return (
                <div style = {{width:"100%", minHeight:"30vh", display:"flex", borderTopStyle: "solid", marginBottom: "30px"}}>
                    <div style = {{width: "50%", 
                        height:"100px", 
                        margin: "10px"}}>
                        <p>
                            Nombre: {this.props.elementInfo.type}
                        </p>
                        <p>
                            Fecha de cultivo: {String(auxDate.getDate()) + "/" + String(auxDate.getMonth() + 1) + "/" + String(auxDate.getFullYear()) +
                            " " + String(auxDate.getHours()) + ":" + String(auxDate.getMinutes())}
                        </p>
                        <p>
                            Fecha de recogida: {
                                String(auxDate2.getDate()) + "/" + String(auxDate2.getMonth() + 1) + "/" + String(auxDate2.getFullYear()) +
                                " " + String(auxDate2.getHours()) + ":" + String(auxDate2.getMinutes())
                                
                            }
                        </p>    
                        {readybutton}
                    </div>
                    <div style = {{width: "50%", 
                        height:"100px", 
                        margin: "10px"}}>
                        <img src={this.props.elementInfo.icon.src} alt="" style={{
                            width: "auto",
                            height: "25vh",
                            marginLeft: "25%"
                        }}></img>    
                    </div>
                </div>
            )
        } else {
            let fields = [];
            fields.push(<option value="" default> --- </option>)
            for(let i = 0; i < this.props.seeds.length; i++) {
                fields.push(<option value={this.props.seeds[i][1].type}>{this.props.seeds[i][1].type} ({this.props.seeds[i][0]})</option>)
            }

            return (
                <div style = {{width:"100%", minHeight:"10vh", borderTopStyle: "solid", marginBottom: "30px"}}>
                    <p>
                        Espacio disponible para cultivos
                    </p>
                    <form>
                        <select onChange={this.updateSel}>
                            {fields}
                        </select>
                        <button type="button" onClick={this.growCrop}>Plantar</button>
                    </form>
                    
                </div>
            )
        }
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
      onSetUser: setUser,
      onLogOut: logOut,
    }, dispatch); 
  }
  
  export default (connect(mapStateToProps, mapActionsToProps)(FarmElement));