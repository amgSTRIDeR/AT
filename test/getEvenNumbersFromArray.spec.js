const { expect } = require('chai');
const NumbersValidator = require('../app/numbersValidator');

describe('isNumberEven positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('Should return even numbers from array of numbers', () => {
    const validationResults = validator.getEvenNumbersFromArray([1, 0, 55, 6, -200, 3]);
    expect(validationResults).to.be.deep.equal([0, 6, -200]);
  });

  it('Should return empty array from empty array', () => {
    const validationResults = validator.getEvenNumbersFromArray([]);
    expect(validationResults).to.be.deep.equal([]);
  });

  it('Should throw an error when provided an array of numbers and strings', () => {
    expect(() => {
      validator.getEvenNumbersFromArray([1, 0, 55, '6', -200, '3']);
    }).to.throw('[1,0,55,6,-200,3] is not an array of "Numbers"');
  });

  it('Should throw an error when provided a number', () => {
    expect(() => {
      validator.getEvenNumbersFromArray(99);
    }).to.throw('[99] is not an array of "Numbers"');
  });

  it('Should throw an error when provided a string', () => {
    expect(() => {
      validator.getEvenNumbersFromArray('some string');
    }).to.throw('[some string] is not an array of "Numbers"');
  });
});
