const outerContainer = document.querySelector('.outer-container');
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

function createContainer(spheresOnOneSide) {
  const container = document.createElement('div');

  container.classList.add('container');
  outerContainer.appendChild(container);

  createSpheres(container, spheresOnOneSide);

  return container;
}

function createSpheres(container, spheresOnOneSide) {
  for (let i = 1; i <= spheresOnOneSide * spheresOnOneSide; i++) {
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

reset.addEventListener('click', () => {
  const spheres = document.querySelectorAll('.container > div > div');
  spheres.forEach(sphere => {
    sphere.style.width = 0;
    sphere.style.height = 0;
  });
});

sizeSelection.addEventListener('change', () => {
  const size = (size) => {
    const parents = document.querySelectorAll('.container > div');
    parents.forEach(parent => {
      parent.style.width = size;
      parent.style.height = size;
    });
  }

  const container = document.querySelector('.container');
    
  switch(sizeSelection.selectedIndex) {
    case 1: // bigger
      container.replaceWith(createContainer(10));
      size('10%');
      break;

    case 2: // smaller
      container.replaceWith(createContainer(30));
      size(`${100 / 30}%`);
      break;

    case 3: // default
      container.replaceWith(createContainer(20));
      size('5%');
      break;
  }
});

createContainer(20);