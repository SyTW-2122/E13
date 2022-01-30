import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from "./page-elements/Main";
import { Navigate, NavLink } from "react-router-dom";
import { setUser, logOut } from '../actions/user-actions'

export class Shop extends React.Component {
        constructor(props) {
        super(props);
        this.buyItem = this.buyItem.bind(this);
        this.sellItem = this.sellItem.bind(this);
    }

    buyItem(e) {
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

        fetch(`http://10.6.130.90/users/${this.props.currentUser.username}/Seeds?name=${e.target.value}&quantity=1`, requestOptions).then(response => response.json()).then((e) => {
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

    sellItem(e) {
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

        fetch(`http://10.6.130.90/users/${this.props.currentUser.username}/Products?name=${e.target.value}&quantity=1`, requestOptions).then(response => response.json()).then((e) => {
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
                    <button value={this.props.currentUser.inventory.products[i][1].name} onClick={this.sellItem}>VENDER</button>
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
        
        let availableSeeds = <div>
            <p>Manzano - 8 monedas/ud </p>
            <button value="Manzano" onClick={this.buyItem}>COMPRAR</button>
            <br/>
            <p>Cerezo - 5 monedas/ud </p>
            <button value="Cerezo" onClick={this.buyItem}>COMPRAR</button>
            <br/>
            <p>Patata - 16 monedas/ud </p>
            <button value="Patata" onClick={this.buyItem}>COMPRAR</button>
            <br/>
            <p>Aguacate - 800 monedas/ud </p>
            <button value="Aguacate" onClick={this.buyItem}>COMPRAR</button>
            <br/>
        </div>
        return <div>
            <Main>
                <div style={{width: "90%", marginLeft: "5%", paddingTop: "20px"}}>
                    <NavLink to = "/"><button>Volver</button></NavLink>
                    <br/>
                    <h1>Vender</h1>
                    {elements}
                    <h1>Comprar</h1>
                    {availableSeeds}
                </div>
            </Main>
        </div>
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

export default connect(mapStateToProps, mapActionsToProps)(Shop);