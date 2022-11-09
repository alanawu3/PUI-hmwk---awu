import React from 'react'
import Sketch from 'react-p5'

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

var mouse = { x: 0, y: 0 };
var limit = 300, pow = 10, force = 0.3;

const AngryCurve = (props) => {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(600, 600).parent(canvasParentRef);
        blob = new Blob({
            sides: 10,
            radius: 75
        });
    }

    const draw = p5 => {
        p5.background(255, 130, 20);
        p5.ellipse(255, 255, 100);
        p5.ellipse(300, 100, 100);
    }

    class Blob = function(args) {
        if (args === undefined) var args = {};
        this.sides = args.sides || 4;
        this.radius = args.radius || 75;
        this.deface = args.deface || 0;
        this.fillStyle = args.fillStyle || "#054dad";
        this.strokeStyle = args.strokeStyle || "#fff";
        this.lineWidth = args.lineWidth || 2;
        
        this.setup = function() {
            console.log("setup");
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            this.vertex = [];
            this.diameter = this.radius * 2;
            this.vertex = [];
            this.dps = Math.PI * 2 / this.sides;
            for (var i = 0; i < this.sides; i++) {
                var angle = this.dps * i;
                var deface = Math.random() * this.deface - (this.deface / 2);
                var x = Math.sin(angle) * (this.diameter + Math.random() * this.deface) + this.x;
                var y = Math.cos(angle) * (this.diameter + Math.random() * this.deface) + this.y;
                var vtx = new Vertex(x, y);
                this.vertex.push(vtx);
            };
        }
        this.render = function(ctx) {
            ctx.beginPath();
            ctx.strokeStyle = this.strokeStyle;
            ctx.fillStyle = "#F25CA2";
            var _current = this.vertex[this.vertex.length - 1];
            var _first = _next = this.vertex[0];
            var _start = _current.curveTo(_next);
            ctx.moveTo(_start.x, _start.y);
            for (var i = 1; i < this.vertex.length; i++) {
                _current = this.vertex[i];
                _next.draw(ctx, _current);
                _next = _current;
            };
            _next.draw(ctx, _first);
            ctx.lineWidth = this.lineWidth;
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
        this.setup();
        window.addEventListener("resize", this.setup.bind(this), false);
        return this;
    }
    
    var Vertex = function(x, y) {
        this.x0 = this.x = x;
        this.y0 = this.y = y;
          this.repulse = function() {
            var dx = mouse.x - this.x;
            var dy = mouse.y - this.y;
            var angle = Math.atan2(dx, dy);
            var dist = Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
            var displacement = limit / dist;
            this.x -= Math.sin(angle) * displacement * pow;
            this.y -= Math.cos(angle) * displacement * pow;
            this.x += (this.x0 - this.x) * force;
            this.y += (this.y0 - this.y) * force;
            }
        this.draw = function(ctx, to) {
            this.repulse();
            var ep = this.curveTo(to);
              ctx.quadraticCurveTo(this.x, this.y, ep.x, ep.y);
        }
        this.curveTo = function(to) {
            return {
                x: (this.x + to.x) / 2,
                y: (this.y + to.y) / 2
            }
        }
        return this;
    }




    return <Sketch setup={setup} draw={draw} />
}




var mouse = { x: 0, y: 0 };
var limit = 300, pow = 10, force = 0.3;
var PI2 = Math.PI*2;
var PX_RATIO = window.devicePixelRatio;
document.addEventListener("pointermove", function(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

var Blob = function(args) {
    if (args === undefined) var args = {};
    this.sides = args.sides || 4;
    this.radius = args.radius || 75;
    this.deface = args.deface || 0;
	this.fillStyle = args.fillStyle || "#054dad";
    this.strokeStyle = args.strokeStyle || "#fff";
    this.lineWidth = args.lineWidth || 2;
    
    this.setup = function() {
		console.log("setup");
		this.x = window.innerWidth / 2;
  	  	this.y = window.innerHeight / 2;
		this.vertex = [];
        this.diameter = this.radius * 2;
        this.vertex = [];
        this.dps = Math.PI * 2 / this.sides;
        for (var i = 0; i < this.sides; i++) {
            var angle = this.dps * i;
            var deface = Math.random() * this.deface - (this.deface / 2);
		    var x = Math.sin(angle) * (this.diameter + Math.random() * this.deface) + this.x;
			var y = Math.cos(angle) * (this.diameter + Math.random() * this.deface) + this.y;
            var vtx = new Vertex(x, y);
            this.vertex.push(vtx);
        };
    }
    this.render = function(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = "#F25CA2";
        var _current = this.vertex[this.vertex.length - 1];
        var _first = _next = this.vertex[0];
        var _start = _current.curveTo(_next);
        ctx.moveTo(_start.x, _start.y);
        for (var i = 1; i < this.vertex.length; i++) {
            _current = this.vertex[i];
            _next.draw(ctx, _current);
            _next = _current;
        };
        _next.draw(ctx, _first);
        ctx.lineWidth = this.lineWidth;
		ctx.closePath();
        ctx.stroke();
		ctx.fill();
    }
    this.setup();
	window.addEventListener("resize", this.setup.bind(this), false);
    return this;
}

var Vertex = function(x, y) {
    this.x0 = this.x = x;
    this.y0 = this.y = y;
	  this.repulse = function() {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var angle = Math.atan2(dx, dy);
        var dist = Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
        var displacement = limit / dist;
        this.x -= Math.sin(angle) * displacement * pow;
        this.y -= Math.cos(angle) * displacement * pow;
        this.x += (this.x0 - this.x) * force;
        this.y += (this.y0 - this.y) * force;
		}
    this.draw = function(ctx, to) {
        this.repulse();
        var ep = this.curveTo(to);
      	ctx.quadraticCurveTo(this.x, this.y, ep.x, ep.y);
    }
    this.curveTo = function(to) {
        return {
            x: (this.x + to.x) / 2,
            y: (this.y + to.y) / 2
        }
    }
    return this;
}

var canvas, context;
var _blob;

function init() {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
    //
    window.addEventListener("resize", function() {
        resize();
    }, false);
    resize();
    //
    _blob = new Blob({
        sides: 10,
        radius: 75
    });
}

function resize() {
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    time = new Date().getTime() * 0.001;
	context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    _blob.render(context);
	context.restore();
}

init();
animate();

export default AngryCurve;