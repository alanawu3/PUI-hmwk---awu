import React from 'react'
import Sketch from 'react-p5'
import AngryCurve from './sketches/AngryCurve'

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

function App() {
  return (
    <div>
      <p> HELLO THERE</p>
      <Shape/>
    </div>
  )
}

export default App