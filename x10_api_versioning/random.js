// random.js

// extract a random number between min and max
const between = (min, max) => {
  if (max < min) max = min;

  return Math.floor( Math.random() * (max-min) + min);
};

module.exports = {
  between,
};
