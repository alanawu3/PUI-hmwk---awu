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
  const [shapes, setShapes] = useState([]); //array of individual shape data arrays (which contain organics objects)
  const [numOrgs, setNumOrgs] = useState(100); //num organics layered to make each shape
  const [numShapes, setNumShapes] = useState(1); //total number of shapes we want

  const [change, setChange] = useState(0);
  const [np, setNP] = useState(100) // how many particles
  const [gravity, setGravity] = useState(.2 - props.happy/100) // downward acceleration
  const[spring, setSpring] = useState(.9) // how much velocity is retained after bounce
  const [drag, setDrag] = useState(0.0001) // drag causes particles to slow down
  const [speedFactor, setSpeedFactor] = useState(1);

  const [pulse, setPulse] = useState(false);

  //r, g, b, dx, dy, numShapes, gravity, roughness, drag, randomness
  //use props to calculate what to set all the states below to
  const [targetR, setTargetR] = useState(props.happy * 2.55);
  const [targetG, setTargetG] = useState(props.happy * 2.55);
  const [targetB, setTargetB] = useState(255 - props.happy * 4);
  
  useEffect(() => {
    setTargetR((props.happy+props.excited) * 2.9 - props.sad * 2.55);
    setTargetG((props.happy + props.excited) * 2 - props.sad*2.55);
    setTargetB(265 - (props.happy*3 + props.excited) + props.sad * 2.55);
    // console.log(targetR)
    // console.log(targetG)
    // console.log(targetB)
    setSpeedFactor(props.excited/20 + 1)
    updateNums()
    setNumOrgs(Math.max(10, props.happy + props.excited - props.sad - props.tired))
    setGravity(Math.max(-.05, .2 - props.happy*0.003 + props.sad*0.004 + props.tired*0.004 - props.excited*.003))
  }, [props.happy, props.sad, props.excited])

  const updateNums = () => {
    for (let i = 0; i < shapes.length; i++) {
      const currShape = shapes[i];
      while (currShape.length > numOrgs) {
        currShape.shift();
      }
    }
  }

  const show = (p5, org) => {
    p5.noStroke(); // no stroke for the circle
    p5.fill(org.r + p5.random(-50, 50), org.g + p5.random(-50, 50), org.b + p5.random(-50, 50), 30);
    
    p5.push(); 
    p5.translate(org.x, org.y); //move to x, y
    p5.rotate(org.angle + change); //rotate by this.angle+change
    p5.beginShape(); 
    //The lines below create our vertex points
    let off = 0;
    for (let i = 0; i < Math.PI*2; i += 0.1) {
      let offset = p5.map(p5.noise(off, change), 0, 1, -(org.roughness + props.excited/100), org.roughness + props.excited/100);
      let r = org.radius + offset;
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);
      p5.vertex(x, y);
      off += 0.1;
    }
    p5.endShape(); //end and create the shape
    p5.pop();
  }

  const step = (p5, org, maxRad, offset) => {
    org.age += 1;
    org.x += org.dx * speedFactor;
    org.y += org.dy * speedFactor;
    if (org.r < targetR + offset*10) {
      org.r += org.dr;
    }
    else if (org.r > targetR + offset*3) {
      org.r -= org.dr;
    }

    if (org.g < targetG + offset*3) {
      org.g += org.dg;
    }
    else if (org.g> targetG + offset*3) {
      org.g -= org.dg;
    }

    if (org.b < targetB + offset*3) {
      org.b += org.db;
    }
    else if (org.b > targetB + offset*3) {
      org.b -= org.db;
    }
  
    if (org.x > p5.width - maxRad) { // bounce off right wall
      //org.x = p5.width - (org.x - p5.width)
      org.dx = -org.dx * spring;
    } else if (org.x < maxRad) { // bounce off left wall
      //org.x *= -1;
      org.dx = -org.dx * spring; 
    }
    if (org.y > p5.height - maxRad) { // p5.height - org.radius HERE CREATES A TAIL bounce off bottom
      //org.y = p5.height - (org.y - p5.height);
      org.dy = (-org.dy * spring);
    } else if (org.y < maxRad) { // bounce off top
      //org.y *= -1;
      org.dy = -org.dy * spring
    }
    org.dy += gravity;
    console.log('grav: ' + gravity)
    // drag is proportional to velocity squared
    // which is the sum of the squares of dx and dy
    
    var vs = Math.pow(org.dx, 2) + Math.pow(org.dy, 2);
    // d is the ratio of old velocty to new velocity
    var d = vs * drag;
    // d goes up with velocity squared but can never be
    // so high that the velocity reverses, so limit d to 1
    d = p5.min(d, .9);
    // scale dx and dy to include drag effect
    org.dx = org.dx * (1 - d);
    org.dy = org.dy * (1 - d);
  }

  const setup = (p5) => {
    p5.createCanvas(800, 800);
    p5.frameRate(50);
    //noLoop();
    
    let orgShape = [];
    for (let i = 0; i < numOrgs; i++) {
      orgShape.push(
        {
          age: 0,
          radius: (.1 + i),
          x: p5.width/2,
          y: p5.height/2,
          dx: -5,
          dy: 5,
          roughness: i * 1,
          angle: i * p5.random(45),
          r: 100,
          g: 100,
          b: 100,
          dr: 1,
          dg: 1,
          db: 1,
          show: show,
          step: step
        })
    }
    shapes.push(orgShape);
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
        show(p5, organic);
        step(p5, organic, currShape[currShape.length - 1].radius * 1.2, j/20);
      }
    }
    setChange(change + 0.01);
  }

  return <Sketch setup={setup} draw={draw} />
}

export default Shape;