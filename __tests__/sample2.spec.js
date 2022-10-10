const execute = require('../lib/sample2');

describe('sample 2', () => {
  it('input 1', () => {
    const input = `
    10 10
    
    A
    1 2 N
    FFRFFFFRRL
    
    B
    7 8 W
    FFLFFFFFFF
    `;

    const result = execute(input);

    expect(result).toBe(`collision at (5,4) at step: 7`);
  });

  it('input 2', () => {
    const input = `
    10 10

    A
    1 2 N
    RFFLF

    B
    7 8 W
    FFLFFFFFFF
    `;

    const result = execute(input);

    expect(result).toBe(`no collision`);
  });
});
