import ReactSlider from "react-slider";
import React, { useState } from 'react';
import './index.css'

const Slider = (props) => {
    return (
        <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={0}
        //onChange={(value) => console.log(value)}
        //onChange={(value) => changeHappy(value)}
        onChange={(value) => props.setValue(value)}
        />
    );
};
export default Slider;