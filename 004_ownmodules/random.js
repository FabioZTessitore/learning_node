// random.js
//
// MIN and MAX are private;
// randomBetween() will be exported;

const MIN = -100;
const MAX = 100;

function randomBetween(min, max) {
  if (min < MIN)  min = MIN;
  if (max > MAX)  max = MAX;

  if (max < min)  max = min;

  return Math.floor(min + Math.random() * (max - min));
}

module.exports = randomBetween;
