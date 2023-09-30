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

  it('Should return true for max safe integer integers', () => {
    const validationResults = validator.isInteger(Number.MAX_SAFE_INTEGER);
    expect(validationResults).to.be.equal(true);
  });

  it('Should return true for min safe integer integers', () => {
    const validationResults = validator.isInteger(Number.MIN_SAFE_INTEGER);
    expect(validationResults).to.be.equal(true);
  });

  it('Should return true for zero', () => {
    const validationResults = validator.isInteger(0);
    expect(validationResults).to.be.equal(true);
  });

  it('Should return false for a decimal', () => {
    const validationResults = validator.isInteger(1.56);
    expect(validationResults).to.be.equal(false);
  });

  it('Should throw an error when provided a string', () => {
    expect(() => {
      validator.isInteger('99');
    }).to.throw('[99] is not a number');
  });

  it('Should throw an error when provided a bigInt', () => {
    expect(() => {
      validator.isInteger(123n);
    }).to.throw('[123] is not a number');
  });

  it('Should throw an error when provided an array', () => {
    expect(() => {
      validator.isInteger([1, 2, -10]);
    }).to.throw('[1,2,-10] is not a number');
  });

  it('Should throw an error when executed without arguments', () => {
    expect(() => {
      validator.isInteger();
    }).to.throw('[undefined] is not a number');
  });

  it('Should throw an error when provided null', () => {
    expect(() => {
      validator.isInteger(null);
    }).to.throw('[null] is not a number');
  });
});
