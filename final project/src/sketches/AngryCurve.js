import React from 'react'
import Sketch from 'react-p5'
import p5 from 'p5'

/*Don’t use setState inside the draw function or in functions called inside the
draw function (because the draw function is executed by P5 in an infinite loop).

Use class properties or variables declared outside your component if you want
to store something (instead of the component state).

If you need the P5 instance used by react-p5 outside your Sketch methods,
then you can get it from window.p5.

Always use .parent(canvasParentRef) method when creating your canvas in the
setup. Because without that P5 will render your canvas outside of your
component and that can be a problem because react-p5 will lose
full control on the rendered canvas.
*/

const AngryCurve = (props) => {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef);
    }

    const draw = p5 => {
        p5.background(255, 130, 20);
        p5.ellipse(255, 100, 100);
        p5.ellipse(300, 100, 100);
    }

    return <Sketch setup={setup} draw={draw} />
}

export default AngryCurve;