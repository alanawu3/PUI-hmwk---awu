import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5'

//organic code citation: https://editor.p5js.org/kmicheli/sketches/HkJp9lt0Q

const NoteShape = (props) => {
  const [shapes, setShapes] = useState([]); //array of individual shape data arrays (which contain organics objects)
  const [numOrgs, setNumOrgs] = useState(100); //num organics layered to make each shape
  const [numShapes, setNumShapes] = useState(1); //total number of shapes we want
  const [scale, setScale] = useState(1);

  const [change, setChange] = useState(0);
  const [dChange, setDChange] = useState(0.01);
  const [gravity, setGravity] = useState(0) // downward acceleration
  const [spring, setSpring] = useState(.9) // how much velocity is retained after bounce
  const [drag, setDrag] = useState(0.0001) // drag causes particles to slow down
  const [speedFactor, setSpeedFactor] = useState(1);
  const [fluxOffset, setFluxOffset] = useState(1);
  const [firstRender, setFirstRender] = useState(true)

  //r, g, b, dx, dy, numShapes, gravity, roughness, drag, randomness
  const [targetR, setTargetR] = useState(100);
  const [targetG, setTargetG] = useState(100);
  const [targetB, setTargetB] = useState(100);
  
  useEffect(() => {
    if (props.data.desolate) { 
      setTargetR(10);
      setTargetG(15);
      setTargetB(90);
      setSpeedFactor(1)
      setNumOrgs(Math.max(10, props.data.happy + props.data.excited - props.data.sad - props.data.tired))
      setNumShapes(Math.floor(Math.max(1, props.data.excited/10)))
      setFluxOffset(.05) //when both are zero, flux = 1, as tired increases flux gets closer to 0, as excited increases flux gets closer to 2
      updateNums();
      setGravity(5);
      setSpring(0);
      setDChange(.01);
      setScale(.2);
    }
    if (props.data.hyper) { 
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
      // setDChange(Math.max(.00001, 0.01 - props.data.tired/2000))
      // setScale(1)
      setDrag(0)
      // console.log(shapes.length)
    }
    else if (props.data.peace) {
      setTargetR(170)
      setTargetG(170)
      setTargetB(170)
      setSpeedFactor(.5)
      setGravity(0)
      setSpring(1);
      setDChange(.005);
      setScale(1);
      setDrag(.0001 + props.data.tired/200)
    }
    else if (!props.data.desolate) {
      setTargetR(100 + props.data.happy + props.data.excited + props.data.angry * 2.8 - props.data.sad + props.data.calm*.3);
      setTargetG(100 + (props.data.happy + props.data.excited)*.7 - props.data.sad - props.data.angry + props.data.calm * .4);
      setTargetB(100 - props.data.happy - props.data.excited + props.data.sad/3 - props.data.angry + props.data.calm*.3);
      setSpeedFactor(props.data.excited/20 + props.data.happy/50 + props.data.angry/100 + 1)
      setNumOrgs(Math.max(10, props.data.happy + props.data.excited - props.data.sad - props.data.tired))
      setNumShapes(Math.floor(Math.max(1, props.data.excited/10)))
      setFluxOffset((props.data.excited - props.data.tired/2)/100 + 1) //when both are zero, flux = 1, as tired increases flux gets closer to 0, as excited increases flux gets closer to 2
      updateNums();
      setGravity(Math.max(-.05, .2 * props.data.happy*-0.003 + props.data.sad*0.004 + props.data.tired*0.004 - props.data.excited*.003))
      setSpring((props.data.happy + props.data.excited)/90 + (props.data.angry + props.data.calm)/100);
      setDChange(Math.max(.00001, 0.01 - props.data.tired/2000 - props.data.calm/4000));
      setScale(1);
      setDrag(.0001 + props.data.tired/200)
    }
    }, [props.data.happy, props.data.sad, props.data.excited, props.data.tired, props.data.angry, props.data.desolate, props.data.hyper, props.data.calm, props.data.peace])

  useEffect(() => {
    setDChange(.02 + props.data.angry/100)
  }, [props.data.angry])

  useEffect(() => {
    if (props.data.rage) {
      setDChange(1)
      setTargetR(150)
      setTargetG(0)
      setTargetB(0)
      setFluxOffset(10) //this doesn't go into effect until later
    }
    else {
      updateNums()
      setDChange(.01)
      //why doesn't it set back to normal settings here? Why does it keep the red & flux?
    }
  }, [props.data.rage])

  const updateNums = () => {
    while (shapes.length < numShapes) {
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
    while (shapes.length > numShapes) {
      shapes.pop();
    }
    for (let i = 0; i < shapes.length; i++) { //loops thru shapes
      const currShape = shapes[i];
      while (currShape.length > numOrgs) { //removes orgs until correct num
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
    p5.noStroke(); // no stroke for the circle
    p5.fill(org.r + org.rX, org.g + org.gX, org.b + org.bX, 30);
    p5.push();
    p5.translate(org.x, org.y); //move to x, y
    p5.rotate(org.angle + change); //rotate by this.angle+change
    p5.scale(scale);
    p5.beginShape(); //The lines below create vertex points
    let off = 0;
    for (let i = 0; i < Math.PI*2; i += 0.1) {
      let offset = p5.map(p5.noise(off, change), 0, 1, -org.roughness, org.roughness);
      //more excited = bigger range, more tired = smaller range
      let r = org.radius + offset;
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);

      if (props.data.wonder) { //turns into spinning star shape
        p5.shearY(Math.PI / 10);
      }

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
  
    if (org.x > p5.width - maxRad*scale) { //bounce off right wall
      org.x -= 5;
      org.dx = -org.dx * spring;
    } else if (org.x < maxRad*scale) { //bounce off left wall
      org.x += 5;
      org.dx = -org.dx * spring; 
    }
    if (org.y > p5.height - maxRad*scale) { //p5.height - org.radius HERE CREATES A TAIL bounce off bottom
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

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  const setup = (p5, canvasParentRef) => {
    // canvasParentRef = <div className="canvasS..">
    //const canvasWidth = canvasParentRef.offsetWidth; //this is currenlty 0
    const canvasWidth = 700;
    // const canvasHeight = canvasParentRef.offsetHeight; //sets to tiny height with this idk why
    const canvasHeight = 700; 
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.frameRate(50);
    
    let orgShape = [];
    for (let i = 0; i < numOrgs; i++) {
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
    if (props.data.asleep) {
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

export default NoteShape;