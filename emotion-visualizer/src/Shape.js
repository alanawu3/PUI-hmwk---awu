import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5'

//organic code citation: https://editor.p5js.org/kmicheli/sketches/HkJp9lt0Q

const Shape = (props) => {
  const [shapes, setShapes] = useState([]); //array of individual shape data arrays (which contain organics objects)
  const [numOrgs, setNumOrgs] = useState(100); //num organics layered to make each shape
  const [numShapes, setNumShapes] = useState(1); //total number of shapes we want
  const [scale, setScale] = useState(1); //scale of size

  const [change, setChange] = useState(0); //rate that shapes rotate
  const [dChange, setDChange] = useState(0.01); //rate that rate that shapes rotate changes by
  const [gravity, setGravity] = useState(0) // downward acceleration
  const [spring, setSpring] = useState(.9) // how much velocity is retained after bounce
  const [drag, setDrag] = useState(0.0001) // drag causes shapes to slow down
  const [speedFactor, setSpeedFactor] = useState(1); //how much faster/slower
  const [fluxOffset, setFluxOffset] = useState(1); //how much shapes pulse in and out
  const [firstRender, setFirstRender] = useState(true)

  const [targetR, setTargetR] = useState(100); //rgb red that shape is trying to reach
  const [targetG, setTargetG] = useState(100); //rgb green that shape is trying to reach
  const [targetB, setTargetB] = useState(100); //rgb blue that shape is trying to reach
  
  useEffect(() => {
    if (!firstRender & props.desolate) { //when desolate state if true
      setTargetR(10);
      setTargetG(15);
      setTargetB(90);
      setSpeedFactor(1)
      setNumOrgs(Math.max(10, props.happy + props.excited - props.sad - props.tired))
      setNumShapes(Math.floor(Math.max(1, props.excited/10)))
      setFluxOffset(.05) //when both are zero, flux = 1, as tired increases flux gets closer to 0, as excited increases flux gets closer to 2
      updateNums();
      setGravity(5);
      setSpring(0);
      setDChange(.01);
      setScale(.2);
    }
    if (!firstRender & props.hyper) { //when hyper state is true
      setTargetR(random(100, 255));
      setTargetG(random(100, 255));
      setTargetB(random(100, 255));
      setSpeedFactor(15)
      // console.log('speedFac: ', speedFactor)
      // //why don't these  update? because only checks for shallow equality
      // setNumOrgs(10)
      // setNumShapes(10)
      // console.log('numShpeas', numShapes)
      setFluxOffset(1.5)
      updateNums();
      setGravity(0)
      setSpring(.9)
      // setDChange(Math.max(.00001, 0.01 - props.tired/2000))
      // setScale(1)
      setDrag(0)
      // console.log(shapes.length)
    }
    else if (!firstRender & props.peace) { //when peace state is true
      setTargetR(170)
      setTargetG(170)
      setTargetB(170)
      setSpeedFactor(.5)
      setGravity(0)
      setSpring(1);
      setDChange(.005);
      setScale(1);
      setDrag(.0001 + props.tired/200)
    }
    else if (!props.desolate) { //any other state
      setTargetR(100 + props.happy + props.excited + props.angry * 2.8 - props.sad + props.calm*.3);
      setTargetG(100 + (props.happy + props.excited)*.7 - props.sad - props.angry + props.calm * .4);
      setTargetB(100 - props.happy - props.excited + props.sad/3 - props.angry + props.calm*.3);
      setSpeedFactor(props.excited/20 + props.happy/50 + props.angry/100 + 1)
      setNumOrgs(Math.max(10, props.happy + props.excited - props.sad - props.tired))
      setNumShapes(Math.floor(Math.max(1, props.excited/10)))
      setFluxOffset((props.excited - props.tired/2)/100 + 1) //when both are zero, flux = 1, as tired increases flux gets closer to 0, as excited increases flux gets closer to 2
      updateNums();
      setGravity(Math.max(-.05, .2 * props.happy*-0.003 + props.sad*0.004 + props.tired*0.004 - props.excited*.003))
      setSpring((props.happy + props.excited)/90 + (props.angry + props.calm)/100);
      setDChange(Math.max(.00001, 0.01 - props.tired/2000 - props.calm/4000));
      setScale(1);
      setDrag(.0001 + props.tired/200)
    }
    }, [props.happy, props.sad, props.excited, props.tired, props.angry, props.desolate, props.hyper, props.calm, props.peace])

  useEffect(() => {
    setDChange(.02 + props.angry/100) //increase rotation speed when angry increases
  }, [props.angry])

  useEffect(() => {
    if (props.rage) { //animation properties for when rage is one
      setDChange(1)
      setTargetR(150)
      setTargetG(0)
      setTargetB(0)
      setFluxOffset(10) //this doesn't go into effect until later
    }
    else { //when rage turns off, reset properties
      updateNums()
      setDChange(.01)
      //why doesn't it set back to normal settings here? Why does it keep the red & flux?
    }
  }, [props.rage])

  const updateNums = () => { //calculates & updates animation properties based on emotions
    while (shapes.length < numShapes) { //creates new shapes to match target # of shapes
      let orgShape = [];
      const startX = random(0, window.innerWidth);
      const startY = random(0, window.innerHeight);
      for (let i = 0; i < numOrgs; i++) {
        orgShape.push(
          {
            age: 0,
            radius: (.1 + i),
            x: startX,
            y: startY,
            dx: 0,
            dy: 0,
            roughness: i * 1,
            angle: i + random(-50, 50),
            r: 100,
            g: 100,
            b: 100,
            rX: random(-50, 50),
            gX: random(-50, 50),
            bX: random(-50, 50),
            dr: 1,
            dg: 1,
            db: 1,
            show: show,
            step: step
          })
      }
    shapes.push(orgShape);
    }
    while (shapes.length > numShapes) { //removes shapes to match target # shapes
      shapes.pop();
    }
    for (let i = 0; i < shapes.length; i++) { //loops thru shapes
      const currShape = shapes[i];
      while (currShape.length > numOrgs) { //removes orgs for each shape until correct num
        currShape.shift();
      }
      const newDX = random(-5, 5);
      const newDY = random(-5, 5);
      for (let j = 0; j < currShape.length; j++) { //loops thru each org for each shape
        //want it to run every time EXCEPT when first rendered
        if (!firstRender) {
          currShape[j].dx = newDX;
          currShape[j].dy = newDY;
        }
        currShape[j].roughness = (fluxOffset + .1) * 50;
        setFirstRender(false);
      }
    }
  }

  const show = (p5, org) => {
    p5.noStroke();
    p5.fill(org.r + org.rX, org.g + org.gX, org.b + org.bX, 30);
    p5.push();
    p5.translate(org.x, org.y); //move to x, y
    p5.rotate(org.angle + change); //rotate by this.angle & change
    p5.scale(scale);
    p5.beginShape();
    let off = 0;
    for (let i = 0; i < Math.PI*2; i += 0.1) {
      let offset = p5.map(p5.noise(off, change), 0, 1, -org.roughness, org.roughness);
      //more excited = bigger range, more tired = smaller range
      let r = org.radius + offset;
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);

      if (props.wonder) { //turns into spinning star shape when in wonder state
        p5.shearY(Math.PI / 10);
      }

      p5.vertex(x, y);
      off += 0.1;
    }
    p5.endShape(); //end & create the shape
    p5.pop();
  }

  const step = (p5, org, maxRad, offset) => { //moves shape (animation)
    org.age += 1;
    org.x += org.dx * speedFactor;
    org.y += org.dy * speedFactor;
    //step by step move towards target colors
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
  
    if (org.x > p5.width - maxRad*scale) { //bounce off right wall
      org.x -= 5;
      org.dx = -org.dx * spring;
    } else if (org.x < maxRad*scale) { //bounce off left wall
      org.x += 5;
      org.dx = -org.dx * spring; 
    }
    if (org.y > p5.height - maxRad*scale) { //bounce off bottom
      org.y -= 5;
      org.dy = (-org.dy * spring);
    } else if (org.y < maxRad*scale) { //bounce off top
      org.y += 5;
      org.dy = -org.dy * spring
    }
    org.dy += gravity;
    var vs = Math.pow(org.dx, 2) + Math.pow(org.dy, 2); // drag is proportional to velocity squared which is the sum of the squares of dx and dy
    var d = vs * drag; // d is the ratio of old velocty to new velocity
    d = p5.min(d, .9); // d goes up with velocity squared but can never be so high that the velocity reverses, so limit d to 1
    org.dx = org.dx * (1 - d);// scale dx and dy to include drag effect
    org.dy = org.dy * (1 - d);
  }

  const random = (min, max) => { //returns random number within (min, max) range
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  const setup = (p5, canvasParentRef) => {
    const canvasWidth = canvasParentRef.offsetWidth; //sets sketch width to aprent container widcth
    const canvasHeight = 789; 
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.frameRate(50); //# frames per second
    
    let orgShape = [];
    for (let i = 0; i < numOrgs; i++) { //creates initial array of shapes
      orgShape.push(
        {
          age: 0,
          radius: (.1 + i),
          x: p5.width*.55,
          y: p5.height/2,
          dx: 0,
          dy: 0,
          roughness: i * fluxOffset,
          angle: i * p5.random(45),
          r: 100,
          g: 100,
          b: 100,
          rX: p5.random(-50, 50),
          gX: p5.random(-50, 50),
          bX: p5.random(-50, 50),
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
    if (props.asleep) { //change background to gray when asleep
      p5.background(100, 100, 100, 30);
    }
    else {
      p5.background(0, 0, 0, 30);
    }
    p5.stroke(0);
    p5.strokeWeight(10);

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
    setChange(change + dChange);
  }

  return <Sketch setup={setup} draw={draw} />
}

export default Shape;