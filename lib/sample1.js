const directions = ['N', 'E', 'S', 'W'];

const commandsMap = {
  // L: rotate left
  L: (currentDirectionIndex) => {
    return currentDirectionIndex === 0 ? 3 : currentDirectionIndex - 1;
  },
  // R: rotate right
  R: (currentDirectionIndex) => {
    return currentDirectionIndex === 3 ? 0 : currentDirectionIndex + 1;
  },
  // F: forward
  F: (sizes, currentPoint, currentDirectionIndex) => {
    const [width, height] = sizes;

    const [y, x] = currentPoint;

    switch (currentDirectionIndex) {
      case 0: {
        // N
        if (y + 1 < height) {
          return [y + 1, x];
        }

        return currentPoint;
      }
      case 1: {
        // E
        if (x + 1 < width) {
          return [y, x + 1];
        }

        return currentPoint;
      }
      case 2: {
        // S
        if (y - 1 >= 0) {
          return [y - 1, x];
        }

        return currentPoint;
      }
      case 3: {
        // W
        if (x - 1 >= 0) {
          return [y, x - 1];
        }

        return currentPoint;
      }
    }
  },
};

function execute(input) {
  const history = [];

  const requirement = input
    .replace(/^\s+|\s+$/g, '')
    .replace(/[\s]{2,}/g, '\n')
    .replace(/\n+/g, '\n')
    .trim();

  const [initialSizes, initialPoint, commands] = requirement.split('\n');

  const sizes = initialSizes.split(' ').map(Number);

  const [width, height] = sizes;

  const [x, y, initialFacing] = initialPoint
    .split(' ')
    .map((txt) => (isNaN(Number(txt)) ? txt : Number(txt)));

  let currentDirectionIndex = directions.indexOf(initialFacing);

  // create grid base on width and height
  const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

  // set init point
  grid[y][x] = 'car';

  let currentPoint = [y, x];

  // loop through commands
  for (let i = 0; i < commands.length; i += 1) {
    const command = commands[i];

    const [currentY, currentX] = currentPoint;

    if (command === 'F') {
      const [newY, newX] = commandsMap.F(sizes, currentPoint, currentDirectionIndex);
      grid[currentY][currentX] = 0;
      grid[newY][newX] = 'car';
      currentPoint = [newY, newX];
    }

    if (['L', 'R'].includes(command)) {
      currentDirectionIndex = commandsMap[command](currentDirectionIndex);
    }

    history.push({
      command: command,
      direction: directions[currentDirectionIndex],
      position: {
        x: currentX,
        y: currentY,
      },
    });
  }

  return {
    history,
    result: `${currentPoint[1]} ${currentPoint[0]} ${directions[currentDirectionIndex]}`,
  };
}

module.exports = execute;
