import React from "react";

const Number = (props) => {
    const divStyle = {
        width: `${props.width}px`,
        height: `${props.height}px`,
        backgroundColor: `${props.color}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '21px',
        color: 'white',
        cursor: 'pointer'
       
        // margin: '1px'
    };

    return (
        <div style={divStyle}>
            {props.num}
        </div>
    )
}

export default Number;
