import React, { useState, useEffect } from 'react';
import Slider from './slider';
import './index.css'
import Shape from './Shape';

function App() {
  //emotions on a scale 0 - 100
  const [happy, setHappy] = useState(0);
  const [sad, setSad] = useState(0);
  const [excited, setExcited] = useState(0);
  const [tired, setTired] = useState(0);
  const [angry, setAngry] = useState(0);
  const [worried, setWorried] = useState(1);
  const [calm, setCalm] = useState(1);
  const [anxious, setAnxious] = useState(1);
  const [numShapes, setNumShapes] = useState();

  const pageStyle = {
    display: 'flex',
    backgroundColor: 'black',
    //border: '3px solid blue',
    height: window.innerHeight,
  }

  const sidebarStyle = {
      width: '20%',
      height: window.innerHeight,
      backgroundColor: '#FECA13',
      //border: '3px solid red',
      textAlign: 'center',
  }

  const canvasStyle = {
    width: '80%',
    height: window.innerHeight,
}

  const sliderStyle = {
    margin: '30px 5px 30px 5px',
    border: '3px dashed blue'
}

  return (
    //WHY ISN'T SHAPE COMPONENT RENDERING INSIDE OF PAGE DIV
    <div style={pageStyle}>
      <div style={sidebarStyle}>
        <h3>happy {happy}</h3>
        <div style={sliderStyle}><Slider value={happy} setValue={setHappy} /></div>
        <h3>sad {sad}</h3>
        <div style={sliderStyle}><Slider value={sad} setValue={setSad}/></div>
        <h3>excited {excited}</h3>
        <div style={sliderStyle}><Slider value={excited} setValue={setExcited}/></div>
        <h3>tired {tired}</h3>
        <div style={sliderStyle}><Slider value={tired} setValue={setTired}/></div>
        <h3>angry {angry}</h3>
        <div style={sliderStyle}><Slider value={angry} setValue={setAngry}/></div>
      </div>
      <div style={canvasStyle}>
        <Shape happy={happy} sad={sad} excited={excited} tired={tired} angry={angry}
        worried={worried} calm={calm} anxious={anxious} numShapes={numShapes}/>
      </div>
    </div>
);
}

export default App;


// const animate= () => {
//   for (let i = 0; i < shapeData.length; i++) {
//     const currPoint = shapeData[i];
//     const nX = noise(currPoint.noiseOffsetX, currPoint.noiseOffsetX);
//     const nY = noise(currPoint.noiseOffsetY, currPoint.noiseOffsetY);
    
//     const x = map(nX, -1, 1, currPoint.originX - 20, currPoint.originY + 20);
//     const y = map(nY, -1, 1, currPoint.originY - 20, currPoint.originX + 20);
    
//     currPoint.x = x;
//     currPoint.y = y;

//     currPoint.noiseOffsetX += noiseStep;
//     currPoint.noiseOffsetY += noiseStep;

//     //for altering gradient
//     const hueNoise = noise(noiseOffset, noiseOffset);
//     const hue = map(hueNoise, -1, 1, 0, 360);

//     //TO DO update gradient values
//     setNoiseOffset(noiseOffset + noiseStep/6);
//   }
// }

// const noise = (x, y) => {
//   setNoiseStep(createNoise2D(x, y, 10));
// }

// const map = (n, start1, end1, start2, end2) => {
//   return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
// }


//   //starts with grey circle in middle of screen
//   const [shapeData, setShapeData] = useState([{
//     x: window.innerWidth/2,
//     y: window.innerHeight/2,
//     dx: 50,
//     dy: 50,
//     r: 100,
//     g: 100,
//     b: 100,
//     numPts: 3,
//     size: 50
//   }]);

//   const [AX, setAX] = useState(0);
//   const [AY, setAY] = useState(0);
//   const [DR, setDR] = useState(100);
//   const [DG, setDG] = useState(100);
//   const [DB, setDB] = useState(100);
  
//   //when happy, sad, or calm are changed, numShapes is recalculated
//   useEffect(() => {
//     const num = Math.round((Math.abs(happy - (sad + calm)/2)/100) * 12 + 1);
//     setNumShapes(num);
//   }, [happy, sad, calm])

//   //updates shape data when any emotion parameters are changed
//   //DO I EVEN NEED THIS SINCE THE APP WILL BE RERENDERED ANYTIME STATE IS CHANGED
//   useEffect(() => {
//     updateShapeData();
//     //setNumShapes(Math.abs(happy - (sad + calm)/2)/100);
//   }, [happy, sad, excited, tired, angry, worried, calm, anxious]);

//   const addNewShapes = () => {
//     while (shapeData.length < numShapes) {
//       const baseData = shapeData[0];
//       shapeData.push({
//         x: baseData.x + getRandom(-700, 100),
//         y: baseData.y + getRandom(-700, 100),
//         dx: baseData.dx + getRandom(-100, 100),
//         dy: baseData.dy + getRandom(-100, 100),
//         r: baseData.r + getRandom(-255, 255),
//         g: baseData.g + getRandom(-255, 255),
//         b: baseData.b + getRandom(-255, 255),
//         numPts: baseData.numPts,
//         size: baseData.size
//       })
//     }
//   }
  
//   const getChanges = () => {
//     setAX(((happy + angry + anxious + worried)/4 - (tired + sad + calm)/3) * 2.55);
//     setAY((((happy + angry + anxious + worried)/4 - (tired + sad + calm)/3) * Math.random(.8, 1.2)) * 2.55);
//     setDR(((happy + angry + excited)/3 - (anxious + worried + tired + sad + calm)/5) * 2.55);
//     setDG((calm + tired)/2);
//     setDB(((tired + sad + calm + anxious + worried)/5 - (happy + angry + excited)/3)* 2.55);
//   }

//   //deletes random shapes until shapeData.length == numShapes
//   const removeShapes = () => {
//     while (shapeData.length > numShapes) {
//       const randIndx = Math.random(0, shapeData.length);
//       shapeData.pop(randIndx);
//     }
//   }

//   const updateShapeData = () => {
//     if (shapeData.length > numShapes) {
//       removeShapes();
//     }
//     getChanges();
//     const newShapeData = []; //will hold updated array of shape data
//     for (let i = 0; i < shapeData.length; i++) {
//       const currData = shapeData[i];
//       const newData = {
//         x: currData.x + currData.dx,
//         y: currData.y + currData.dy,
//         dx: currData.dx + AX,
//         dy: currData.dy + AY,
//         r: currData.r + DR,
//         g: currData.g + DG,
//         b: currData.b + DB,
//         numPts: currData.numPts,
//         size: currData.size
//       } 
//       newShapeData.push(newData);
//     }
//     if (shapeData.length < numShapes) {
//       addNewShapes();
//     }
//   }

//   const getRandom = (min, max) => {
//     return Math.random() * (max - min) + min;
// }

//   const [noiseOffset, setNoiseOffset] = useState(0);
//   const [noiseStep, setNoiseStep] = useState(0.005);
//   //const [simplex, setSimplex] = useState(new SimplexNoise());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       move();
//       //animate();
//       updateShapeData();
//       }, 100);
//       return () => clearInterval(interval);
//   });

//   const move = () => {
//     //loop through all the shapeData x & y
//     //x += dx, y += dy
//     for (let i = 0; i < shapeData.length; i++) {
//       shapeData[i].x += shapeData[i].dx;
//       shapeData[i].y += shapeData[i].dy;
//       if (shapeData[i].x >= window.innerWidth || shapeData[i].x <= 0) {
//         shapeData[i].x *= -1;
//       }
//       if (shapeData[i].y >= window.innerHeight || shapeData[i].y <= 0) {
//         shapeData[i].y *= -1;
//       }
//     }
//   }

