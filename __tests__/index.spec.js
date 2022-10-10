const execute = require('../lib/sample1');

describe('sample 1', () => {
  it('input 1', () => {
    const input = `
    10 10
    1 2 N
    FFRFFFRRLF
    `;

    const result = execute(input);

    expect(result).toBe(`4 3 S`);
  });

  it('input 2', () => {
    const input = `
    6 8
    1 3 E
    LFFRFFFFRFFLF
    `;

    const result = execute(input);

    expect(result).toBe(`5 3 E`);
  });

  it('input 3', () => {
    const input = `
    6 12
    4 4 W
    LFLFLFFRFFRFRFLFFFFRFFFFFRFRF
    `;

    const result = execute(input);

    expect(result).toBe(`1 1 E`);
  });
});
