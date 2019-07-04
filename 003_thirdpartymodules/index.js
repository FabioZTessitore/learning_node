// Using a third-party module

// Install:
// $ npm install mustache


const Mustache = require('mustache');

let result = Mustache.render(
  'Hello, {{ first }} {{ last }}!',
  {
    first: 'Nicolas',
    last: 'Cage'
  }
);
console.log(result);

result = Mustache.render(
  'Hello, {{ first }} {{ last }}!',
  {
    first: 'Sheryl',
    last: 'Sandberg'
  }
);
console.log(result);
