import React, { useState, useEffect } from 'react';
import './index.css'

//individual notecard

const Card = (props) => {
    const [isSelected, setIsSelected] = useState(false)

    const cardStyle = {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        borderRadius: '10px',
        alignItems: 'center',
        margin: '5px',
        padding: '15px 10px 0px 10px',
        border: '5px solid white',
        boxSizing: 'content-box',
        boxShadow: '5px 5px #888888'
    }

    const selectedStyle = {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        borderRadius: '10px',
        margin: '5px',
        alignItems: 'center',
        padding: '15px 10px 0px 10px',
        border: '5px solid blue', 
        boxSizing: 'content-box',
        boxShadow: '5px 5px rgb(0, 0, 150)'
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
            setIsSelected(true)
        }
        else { //deselect current notecard
            props.setSketchPopup(-1)
            setIsSelected(false)
        }
    }

    return (
        //turn on / off popup when clicked
        <div>
        {props.selected ? 
        <div onClick={() => popup()} style={isSelected ? selectedStyle : cardStyle}>
            <div style={emotionStyle}></div>
        </div>
        :
        <div onClick={() => popup()} style={cardStyle}>
            <div style={emotionStyle}></div>
        </div>}
        </div>
    )
}

export default Card;
