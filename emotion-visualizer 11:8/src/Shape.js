import React, { useState, useEffect } from 'react';
import { spline } from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';
import { createNoise2D } from 'simplex-noise';

import Sketch from 'react-p5'
import p5 from 'p5'

//organic code citation: https://editor.p5js.org/kmicheli/sketches/HkJp9lt0Q

//calculate all parameters from props emotions
//actually draw Organic objects




const Shape = (props) => {

  //use props to calculate what to set all the states below to
  const [shapes, setShapes] = useState([]); //array of individual shape data arrays (which contain organics objects)

  const [change, setChange] = useState(0);
  const [r, setR] = useState(255)
  const [g, setG] = useState(255)
  const [b, setB] = useState(255)
  const [np, setNP] = useState(100) // how many particles
  const [gravity, setGravity] = useState(.1) // downward acceleration
  const[spring, setSpring] = useState(.9) // how much velocity is retained after bounce
  const [drag, setDrag] = useState(0.0001) // drag causes particles to slow down

  const show = (p5, change) => {
    p5.noStroke(); // no stroke for the circle
    p5.fill('blue');
    //p5.fill(p5.rgb(r, g, b)); //color to fill the blob
    
    p5.push(); 
    p5.translate(x, y); //move to x, y
    p5.rotate(angle + change); //rotate by this.angle+change
    p5.beginShape(); 
    //The lines below create our vertex points
    let off = 0;
    for (let i = 0; i < Math.PI*2; i += 0.1) {
        let offset = p5.map(p5.noise(off, change), 0, 1, -roughness, roughness);
        let r = this.radius + offset;
        let x = r * Math.cos(i);
        let y = r * Math.sin(i);
        p5.vertex(x, y);
        off += 0.1;
    }
    p5.endShape(); //end and create the shape
    p5.pop();
  }

  const step = (p5) => {
    this.age += 1;
    this.x += dx;
    this.y += dy;
  
    if (x > 800) { // bounce off right wall
      this.x = 800 - (x - 800)
      this.dx = -this.dx * spring;
    } else if (x < 0) { // bounce off left wall
      this.x *= -1;
      this.dx = -this.dx * spring; 
    }
    if (y > 800) { // bounce off bottom
      this.y = 800 - (y - 800);
      this.dy = (-this.dy * spring);
    } else if (y < 0) { // bounce off top
      this.y *= -1;
      this.dy = -this.dy * spring
    }
    //dy = dy + gravity;
    // drag is proportional to velocity squared
    // which is the sum of the squares of dx and dy
    
    var vs = Math.pow(dx, 2) + Math.pow(dy, 2);
    // d is the ratio of old velocty to new velocity
    var d = vs * drag;
    // d goes up with velocity squared but can never be
    // so high that the velocity reverses, so limit d to 1
    d = p5.min(d, .9);
    // scale dx and dy to include drag effect
    this.dx = this.dx * (1 - d);
    this.dy = this.dy * (1 - d);
  }

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(800, 800);
  p5.frameRate(50);
  //noLoop();
  const colorsPalette = [
      (r, g + 255, b, 30),
      (r, g + 150, b + 50, 30),
      (r, 0, 0, 30)];
  
  let orgShape1 = [];
  for (let i = 0; i < 110; i++) {
    orgShape1.push(
      {
        age: 0,
        radius: (.1 + i),
        x: p5.width/2,
        y: p5.height/2,
        dx: -5,
        dy: 5,
        roughness: i * 1,
        angle: i * p5.random(45),
        color: colorsPalette[p5.floor(p5.random(colorsPalette.length))],
        show: show,
        step: step
      })
  }
  shapes.push(orgShape1);
  console.log(shapes[1]);
  
}

const draw = p5 => {
  p5.background(0, 0, 0, 30);
  p5.stroke(0);
  p5.strokeWeight(10);
  let ax = Math.random(-1, 1);
  let ay = Math.random(-1, 1);

  //loop through shapes array
  for (let i = 0; i < shapes.length; i++) {
    const currShape = shapes[i];
    //loop thru organics in each shape's array
    for (let j = 0; j < currShape.length; j++) {
      const organic = currShape[j];
      organic.show(p5, change);
      organic.step(p5, ax, ay);
    }
  }
  setChange(change + 0.01);
}

return <Sketch setup={setup} draw={draw} />
}

export default Shape;








//ORGANIZATION THAT STORES INDIVIDUAL ORGANIC DATA IN THE STATE OF THE COMPONENT
//EACH COMPONENT IS JUST AN ORGANIC, 100 ORGANICS MAKE A SHAPE

// const Shape = (props) => {

//   //use props to calculate what to set all the states below to

//   const [change, setChange] = useState(0);
//   const [r, setR] = useState(255)
//   const [g, setG] = useState(255)
//   const [b, setB] = useState(255)
//   const [np, setNP] = useState(100) // how many particles
//   const [gravity, setGravity] = useState(.1) // downward acceleration
//   const[spring, setSpring] = useState(.9) // how much velocity is retained after bounce
//   const [drag, setDrag] = useState(0.0001) // drag causes particles to slow down

//   //set all of these with calculations from emotion parameters (props)
//   const [radius, setRadius] = useState(0.1)
//   const [x, setX] = useState(400)
//   const [y, setY] = useState(400)
//   const [dx, setDX] = useState(-5)
//   const [dy, setDY] = useState(5)
//   const [roughness, setRoughness] = useState(1)
//   const [angle, setAngle] = useState(Math.random(45))
//   const [age, setAge] = useState(0)

//   const show = (p5, change) => {
//     p5.noStroke(); // no stroke for the circle
//     p5.fill('red');
//     //p5.fill(p5.rgb(r, g, b)); //color to fill the blob
    
//     p5.push(); 
//     p5.translate(x, y); //move to x, y
//     p5.rotate(angle + change); //rotate by this.angle+change
//     p5.beginShape(); 
//     //The lines below create our vertex points
//     let off = 0;
//     for (let i = 0; i < Math.PI*2; i += 0.1) {
//         let offset = p5.map(p5.noise(off, change), 0, 1, -roughness, roughness);
//         let r = radius + offset;
//         let x = r * Math.cos(i);
//         let y = r * Math.sin(i);
//         p5.vertex(x, y);
//         off += 0.1;
//     }
//     p5.endShape(); //end and create the shape
//     p5.pop();e
//   }

//   const step = (p5, ax, ay) => {
//     setAge(age + 1)
//     setX(x + dx)
//     setY(y + dy)

//     if (x > 800) { // bounce off right wall
//       setX(800 - (x - 800));
//       setDX(-dx * spring);
//     } else if (x < 0) { // bounce off left wall
//       setX(-x);
//       setDX(-dx * spring);    
//     }
//     if (y > 800) { // bounce off bottom
//       setY(800 - (y - 800));
//       setDY(-dy * spring);
//     } else if (y < 0) { // bounce off top
//       setY(-y);
//       setDY(-dy * spring);
//     }
//     //dy = dy + gravity;
//     // drag is proportional to velocity squared
//     // which is the sum of the squares of dx and dy
    
//     var vs = Math.pow(dx, 2) + Math.pow(dy, 2);
//     // d is the ratio of old velocty to new velocity
//     var d = vs * drag;
//     // d goes up with velocity squared but can never be
//     // so high that the velocity reverses, so limit d to 1
//     d = p5.min(d, .9);
//     // scale dx and dy to include drag effect
//     setDX(dx * (1 - d));
//     setDY(dy * (1 - d));
//   }

// const setup = (p5, canvasParentRef) => {
//   p5.createCanvas(800, 800);
//   p5.frameRate(50);
//   //noLoop();
//   const colorsPalette = [
//       (r, g + 255, b, 30),
//       (r, g + 150, b + 50, 30),
//       (r, 0, 0, 30)];
//   }

// const draw = p5 => {
//   p5.background(0, 0, 0, 30);
//   p5.stroke(0);
//   p5.strokeWeight(10);
//   var ax = Math.random(-1, 1);
//   var ay = Math.random(-1, 1);
//   show(p5, change);
//   step(p5, ax, ay);
//   setChange (change + 0.01);
//   }

// return <Sketch setup={setup} draw={draw} />
// }

// export default Shape;





// function Shape(props) {
//   useEffect(() => {
//     createPoints(props.numPts, props.size);
//   }, [])

//   const [points, setPoints] = useState([]);
//   const [path, setPath] = useState();
//   const [noiseOffset, setNoiseOffset] = useState(0);
//   const [noiseStep, setNoiseStep] = useState(0.005);
//   //const [simplex, setSimplex] = useState(new SimplexNoise());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       //animate();
//       }, 1000);
//       return () => clearInterval(interval);
//   }, []);

//   const animate= () => {
//     for (let i = 0; i < points.length; i++) {
//       const currPoint = points[i];
//       const nX = noise(currPoint.noiseOffsetX, currPoint.noiseOffsetX);
//       const nY = noise(currPoint.noiseOffsetY, currPoint.noiseOffsetY);
      
//       const x = map(nX, -1, 1, currPoint.originX - 20, currPoint.originY + 20);
//       const y = map(nY, -1, 1, currPoint.originY - 20, currPoint.originX + 20);
      
//       currPoint.x = x;
//       currPoint.y = y;

//       currPoint.noiseOffsetX += noiseStep;
//       currPoint.noiseOffsetY += noiseStep;

//       //for altering gradient
//       const hueNoise = noise(noiseOffset, noiseOffset);
//       const hue = map(hueNoise, -1, 1, 0, 360);

//       //TO DO update gradient values
      
//       setNoiseOffset(noiseOffset + noiseStep/6);
//     }
//   }

//   const noise = (x, y) => {
//     setNoiseStep(createNoise2D(x, y, 10));
//   }

//   const createPoints = (numPts, size) => {
//     const angleStep = (Math.PI * 2) / numPts;
//     for (let i = 1; i <= numPts; i++) {
//       const theta = i * angleStep;
//       const x = 100 + Math.cos(theta) * size;
//       const y = 100 + Math.sin(theta) * size;
      
//       points.push({
//         x: x,
//         y: y,
//         originX: x,
//         originY: y,
//         noiseOffsetX: Math.random() * 1000,
//         noiseOffsetY: Math.random() * 1000
//       });
//     }
//     setPath(spline(points, 1, true));
//   }


//   const map = (n, start1, end1, start2, end2) => {
//     return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
//   }

//   const aStyle = {
//     position: 'absolute',
//     border: '3px solid purple',
//     width: '100%',
//     800: '100%'
//   }
//   const svgStyle = {
//     border: '3px solid red',
//     position: 'absolute',
//     left: `${props.x/10}`,
//     top: `${props.y/10}`,
//     width: '200px', //adjust these, svg size automatically changes to fit
//     800: '200px'
//   }
//   return (
//     <div style={aStyle}>
//       <svg viewBox={`65 50 100 100`} style={svgStyle}>
//         <path d={path} fill={`rgb(${props.r}, ${props.g}, ${props.b})`}></path>
//       </svg>
//     </div>
//     )
//   }

//<svg viewBox={`${props.x/10} ${props.y/10} 100 100`}>
//viewBox = 'x y width 800'
//move the entire svg div OR move where the viewport is located OR viewport zoom in/out