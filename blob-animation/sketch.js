import { spline } from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';

const path = document.querySelector('path');
const root = document.documentElement;

let hueNoiseOffset = 0;
let noiseStep = 0.005;

const points = createPoints();

(function animate() {
    path.setAttribute('d', spline(points, 1, true));
    requestAnimationFrame(animate);

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
        // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
        const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
        const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);
    
        // update the point's current coordinates
        point.x = x;
        point.y = y;
    
        // progress the point's x, y values through "time"
        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
    }

    const hueNoise = noise(hueNoiseOffset, -1, 1, 0, 360);
    root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
    root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);

    document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;
    hueNoiseOffset += noiseStep / 6

    requestAnimationFrame(animate);
})();

function createPoints() {
    const points = [];
    const numPoints = 6; //number of points needed
    const angleStep = (Math.PI * 2) / numPoints; //used to equally space each point around the circle
    const rad = 75;

    for (let i = 1; i <= numPoints; i++) {
        const theta = i * angleStep;
        const x = 100 + Math.cos(theta) * rad;
        const y = 100 + Math.sin(theta) * rad;

        points.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000
        });
    }
    return points;
}

function map (n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

const simplex = new SimplexNoise();

function noise(x, y) {
    return simplex.noise2D(x, y);
}

document.querySelector("path").addEventListener("mouseover", () => {
    noiseStep = 0.01;
})

document.querySelector("path").addEventListener("mouseleave", () => {
    noiseStep = 0.005;
})