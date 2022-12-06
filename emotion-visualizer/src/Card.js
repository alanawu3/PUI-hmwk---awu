import React, { useState, useEffect } from 'react';
import './index.css'

//individual notecard

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
        if (props.sketchPopup == -1) { //no notecard currently selected, set to clicked on notecard
            props.setSketchPopup(props.indx)
        }
        else { //deselect current notecard
            props.setSketchPopup(-1)
        }        
    }

    return (
        //turn on / off popup when clicked
        <div onClick={() => popup()} style={cardStyle}>
            <div style={emotionStyle}></div>
        </div>
    )
}

export default Card;
