import React from 'react'
import Sketch from 'react-p5'
import p5 from 'p5'

/*Don’t use setState inside the draw function or in functions called inside the
draw function (because the draw function is executed by P5 in an infinite loop).

Use class properties or letiables declared outside your component if you want
to store something (instead of the component state).

If you need the P5 instance used by react-p5 outside your Sketch methods,
then you can get it from window.p5.

Always use .parent(canvasParentRef) method when creating your canvas in the
setup. Because without that P5 will render your canvas outside of your
component and that can be a problem because react-p5 will lose
full control on the rendered canvas.
*/
//organic code citation: https://editor.p5js.org/kmicheli/sketches/HkJp9lt0Q






const Shape = (props) => {
    let np = 100;      // how many particles
    let gravity = 0.1; // downward acceleration
    let spring = 0.9;  // how much velocity is retained after bounce
    let drag = 0.0001;    // drag causes particles to slow down

    let orgShape1 = [];
    let orgShape2 = [];
    // The letiable change stores the rate of rotation and the y coordinate for noise later
    let change, colorsPalette;

    class Organic = (radius, x, y, dx, dy, roughness, angle, color)=> {
        this.radius = radius; //radius of blob
        this.x = x; //x position of blob
        this.y = y; // y position of blob
        this.roughness = roughness; // magnitude of how much the circle is distorted
        this.angle = angle; //how much to rotate the circle by
        this.color = color; // color of the blob
        this.age = 0;
        this.dx = dx;
        this.dy = dy;

        this.show = function(change) {
            noStroke(); // no stroke for the circle
            fill(this.color); //color to fill the blob
            
            push(); 
            translate(this.x, this.y); //move to x, y
            rotate(this.angle + change); //rotate by this.angle+change
            beginShape(); 
            //The lines below create our vertex points
            let off = 0;
            for (let i = 0; i < TWO_PI; i += 0.1) {
                let offset = map(noise(off, change), 0, 1, -this.roughness, this.roughness);
                let r = this.radius + offset;
                let x = r * cos(i);
                let y = r * sin(i);
                vertex(x, y);
                off += 0.1;
            }
            endShape(); //end and create the shape
            pop();
        }

        this.step = function(ax, ay) {
            this.age++;
            this.x += this.dx;
            this.y += this.dy;

            //this.dx += ax;
            //this.dy += ay;

            if (this.x > width) { // bounce off right wall
                this.x = width - (this.x - width);
                this.dx = -this.dx * spring;
            } else if (this.x < 0) { // bounce off left wall
                this.x = -this.x;
                this.dx = -this.dx * spring;       
            }
            if (this.y > height) { // bounce off bottom
                this.y = height - (this.y - height);
                this.dy = -this.dy * spring;
            } else if (this.y < 0) { // bounce off top
                this.y = -this.y;
                this.dy = -this.dy * spring;
            }
            //this.dy = this.dy + gravity;
            // drag is proportional to velocity squared
            // which is the sum of the squares of dx and dy
            
            let vs = Math.pow(this.dx, 2) + Math.pow(this.dy, 2);
            // d is the ratio of old velocty to new velocity
            let d = vs * drag;
            // d goes up with velocity squared but can never be
            // so high that the velocity reverses, so limit d to 1
            d = min(d, .9);
            // scale dx and dy to include drag effect
            this.dx *= (1 - d);
            this.dy *= (1 - d);
        }
    }
    ////////////////////////////////////////////////////
    const setup = (p5, canvasParentRef) => {
        p5.background(0,255);
        p5.frameRate(50);
        //noLoop();
        change = 0;
        colorsPalette = [color(146, 167, 202, 30),
                    color(186, 196, 219, 30),
                    color(118, 135, 172, 30),
                    color(76, 41, 81, 30),
                    color (0, 0, 0),
                    color(144, 62, 92, 30),
                    color(178, 93, 119, 30),
                    color(215, 118, 136, 30),
                    color(246, 156, 164, 30),];

    //radius, x, y, dx, dy, roughness (i*N, N bigger = more flowery), angle (doesn't change much), color
    for (let i = 0; i < 110; i++) {
        orgShape1.push(new Organic(0.1 + 1*i, width/2, height/2, -5, 5, i*1, i*random(45),
        colorsPalette[floor(random(9))]));
    }

    for (let i = 0; i < 110; i++) {
        orgShape2.push(new Organic(0.1 + 1*i, width/2, height/2, 30, -30, i*1, i*random(90),
        colorsPalette[floor(random(9))]));
    }
    }

    function getNumShapes() {
        let numShapes = floor(mouseX/50);
        return numShapes;
    }


    const draw = p5 => {
        p5.background(0, 0, 0, 30);
        p5.stroke(0);
        p5.strokeWeight(10);
        let numShapes = getNumShapes();
        let ax = random(-1, 1);
        let ay = random(-1, 1);
        for (let i = 0; i < orgShape1.length; i++){
            //updateColor(orgShape1[i], mouseX, mouseY);
            orgShape1[i].show(change);
            orgShape1[i].step(ax, ay);
        }

        for (let i = 0; i < orgShape2.length; i++){
            orgShape2[i].show(change);
            orgShape2[i].step(ax, ay);
        }
        change += 0.01;
    }

    return <Sketch setup={setup} draw={draw} />
}

export default Shape;