import React from "react";

class FarmElement extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        console.log(this.props.elementInfo)    
        if (this.props.elementInfo) {
            let auxDate = new Date(this.props.elementInfo.lastProduction);
            let auxDate2 = new Date(this.props.elementInfo.lastProduction + (1000 * 60 * 60 * this.props.elementInfo.cycleTime));
            return (
                <div>
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
                    <img src={this.props.elementInfo.icon} alt="" style={{
                        width: "64px",
                        height: "64px"
                    }}></img>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>
                        Espacio disponible para cultivos
                    </h1>
                </div>
            )
        }
        
    }
}

export default FarmElement;