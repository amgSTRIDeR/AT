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

  it('Should return true when provided with an even number', () => {
    const validationResults = validator.isNumberEven(4);
    expect(validationResults).to.be.equal(true);
  });

  it('Should return false when provided with an odd number', () => {
    const validationResults = validator.isNumberEven(3);
    expect(validationResults).to.be.equal(false);
  });

  it('Should return false when provided with an odd number', () => {
    const validationResults = validator.isNumberEven(-21);
    expect(validationResults).to.be.equal(false);
  });

  it('Should throw an error when provided a string', () => {
    expect(() => {
      validator.isNumberEven('4');
    }).to.throw(('[4] is not of type "Number" it is of type "string"'));
  });

  it('Should throw an error when provided a object', () => {
    expect(() => {
      validator.isNumberEven({});
    }).to.throw(('[[object Object]] is not of type "Number" it is of type "object"'));
  });

  it('Should throw an error when provided a null', () => {
    expect(() => {
      validator.isNumberEven(null);
    }).to.throw(('[null] is not of type "Number" it is of type "object"'));
  });

  it('Should throw an error when provided a undefined', () => {
    expect(() => {
      validator.isNumberEven(undefined);
    }).to.throw('[undefined] is not of type "Number" it is of type "undefined"');
  });

  it('Should throw an error when provided a boolean', () => {
    expect(() => {
      validator.isNumberEven(true);
    }).to.throw('[true] is not of type "Number" it is of type "boolean"');
  });
});
