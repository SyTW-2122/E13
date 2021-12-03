import React from "react";

class FarmElement extends React.Component {
    constructor() {
        super();
        this.state = {
            element: "",
            type: "",
            cycleTime: 0,
            lastProduction: new Date(),
            baseProduction: 1,
            icon: ""
        };
    }

    componentDidMount() {
        if (this.props.props.lastProduction instanceof Date) {
            this.setState((prevState) => {
                return ({
                    element: this.props.props.element,
                    type: this.props.props.type,
                    cycleTime: this.props.props.cycleTime,
                    lastProduction: this.props.props.lastProduction,
                    baseProduction: this.props.props.baseProduction,
                    icon: this.props.props.icon
                });
            });
        }
    }

    render() {  
        let auxDate = new Date(this.state.lastProduction.getTime() + (1000 * 60 * 60 * this.state.cycleTime));

        return (
            <div>
                <p>
                    Nombre: {this.state.type}
                </p>
                <p>
                    Fecha de cultivo: {String(this.state.lastProduction.getDate()) + "/" + String(this.state.lastProduction.getMonth()) + "/" + String(this.state.lastProduction.getFullYear()) +
                     " " + String(this.state.lastProduction.getHours()) + ":" + String(this.state.lastProduction.getMinutes())}
                </p>
                <p>
                    Fecha de recogida: {
                        String(auxDate.getDate()) + "/" + String(auxDate.getMonth()) + "/" + String(auxDate.getFullYear()) +
                        " " + String(auxDate.getHours()) + ":" + String(auxDate.getMinutes())
                        
                    }
                </p>
                <img src={this.state.icon} alt="" style={{
                    width: "64px",
                    height: "64px"
                }}></img>
            </div>
        )
    }
}

export default FarmElement;