const { expect } = require('chai');
const NumbersValidator = require('../app/numbersValidator');

describe('isAllNumbers tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  afterEach(() => {
    validator = null;
  });

  it('Should return true for an array of numbers', () => {
    const validationResults = validator.isAllNumbers([1, 2, 3, 0, -200, 1.12]);
    expect(validationResults).to.be.equal(true);
  });

  it('Should return false for an array of numbers and strings', () => {
    const validationResults = validator.isAllNumbers([1, '2', 3, '0', -200, 1.12]);
    expect(validationResults).to.be.equal(false);
  });

  it('Should return true for an empty array', () => {
    const validationResults = validator.isAllNumbers([]);
    expect(validationResults).to.be.equal(false);
  });

  it('Should throw an error when provided a number', () => {
    expect(() => {
      validator.isAllNumbers(99);
    }).to.throw('[99] is not an array');
  });

  it('Should throw an error when provided a string', () => {
    expect(() => {
      validator.isAllNumbers('some string');
    }).to.throw('[some string] is not an array');
  });

  it('Should throw an error when execute without arguments', () => {
    expect(() => {
      validator.isAllNumbers();
    }).to.throw('[undefined] is not an array');
  });
});
