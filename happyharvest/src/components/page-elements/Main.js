import React from "react";
import FarmElement from "../FarmElement";

function Main() {
    let mainStyles = {
        minHeight: "900px",
        marginTop: "5%",
        marginBottom: "5%",
        marginLeft: "20%",
        marginRight: "20%",
        width: "60%",
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    } 

    return (
        <div style={mainStyles}>
            <FarmElement props = {{
                element: "crop",
                type: "Tomate",
                cycleTime: 24,
                lastProduction: new Date,
                icon: "https://image.flaticon.com/icons/png/512/1135/1135538.png"
            }}/>
        </div>
    );
}

export default Main; 