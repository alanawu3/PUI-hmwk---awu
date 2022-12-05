import React, { useState, useEffect } from 'react';
import './index.css'

//organic code citation: https://editor.p5js.org/kmicheli/sketches/HkJp9lt0Q

const Card = (props) => {
    const cardStyle = {
        //won't let me set width rn for some reason
        height: '20%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        borderRadius: '10px',
        alignItems: 'center',
        width: '10%',
        padding: '15px 10px 0px 10px',
        margin: '20px'
    }

    const emotionStyle = {
        backgroundColor: `rgb(${props.r}, ${props.g}, ${props.b})`,
        borderRadius: '10px',
        width: '90%',
        height: '30%',
        padding: '30px',
        margin: '0px 0px 15px 0px'
    }

    const popup = () => {
        if (props.sketchPopup == -1) {
            props.setSketchPopup(props.indx)
        }
        else {
            props.setSketchPopup(-1)
        }        
    }

    return (
        <div onClick={() => popup()} style={cardStyle}>
            <div style={emotionStyle}></div>
        </div>
    )
}

export default Card;
