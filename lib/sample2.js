const executeSample1 = require('./sample1');

const execute = (input) => {
  const requirement = input
    .replace(/^\s+|\s+$/g, '')
    .replace(/[ ]{2,}/g, '')
    .replace(/\n{3,}/g, '\n\n');

  const [initialSizes, carAInfo, carBInfo] = requirement.split('\n\n');

  const [, initialPointA, commandA] = carAInfo.split('\n');
  const [, initialPointB, commandB] = carBInfo.split('\n');

  const carA = `${initialSizes}\n${initialPointA}\n${commandA}`;
  const carB = `${initialSizes}\n${initialPointB}\n${commandB}`;

  const { history: historyA } = executeSample1(carA);

  const { history: historyB } = executeSample1(carB);

  // Check collision
  const intersectionPoints = historyA.map((itemA) => {
    const positionA = itemA.position;

    const isCollision = historyB.some((itemB) => {
      const positionB = itemB.position;

      return positionA.x === positionB.x && positionA.y === positionB.y;
    });

    if (isCollision) return positionA;

    return null;
  });

  const step = intersectionPoints.findIndex((item) => !!item);

  if (step === -1) {
    return 'no collision';
  }

  const { position } = historyA[step];

  return `collision at (${position.x},${position.y}) at step: ${step}`;
};

module.exports = execute;
