const reset = document.querySelector('.reset');
const sizeSelection = document.querySelector('select');
const sphereSizes = ['15%', '40%', '60%', '85%'];
const spherePositions = ['start', 'center', 'end'];
const sphereColors = ['#ff407d', '#8576ff', '#c5ff95', '#ff71cd', '#fff80a', '#fe7a36'];

const addSize = (sphere) => {
    const size = getRandomValue(sphereSizes);

    sphere.style.width = size;
    sphere.style.height = size;
}

const addPosition = (sphere) => {
  sphere.style.alignSelf = getRandomValue(spherePositions);
  sphere.style.justifySelf = getRandomValue(spherePositions);
}

const addColors = (sphere) => {
  sphere.style.backgroundImage = 
    `radial-gradient(circle at 70% 30%, ${getRandomValue(sphereColors)}, #111)`;
}

const getRandomValue = (array) =>
  array[Math.floor(Math.random() * array.length)];

function createSpheres(spheresOnOneSide) {
  for (let i = 1; i <= spheresOnOneSide * spheresOnOneSide; i++) {
    const container = document.querySelector('.container');
    const parent = document.createElement('div');
    const sphere = document.createElement('div');

    container.appendChild(parent);
    parent.appendChild(sphere);

    addSize(sphere);
    addPosition(sphere);
    addColors(sphere);

    parent.addEventListener('mouseenter', addRandomValues);
  }
}

function addRandomValues(e) {
  const sphere = e.target.firstElementChild;

  addSize(sphere);
  addPosition(sphere);
  addColors(sphere);
}

createSpheres(20);