'use strict';

const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const Possibilities = require('possibilities');
const {deconstruct, reconstruct} = require('../lib');

const async = [
  false,
  true,
];

const generator = [
  false,
  true,
];

const name = [
  null,
  'a',
  'aa',
];

const params = [
  null,
  'a = 1, b = () => 2',
  'a = 1, b = function() {return 2;}',
];

const body = [
  'return 1;',
  `function add(a, b) {return a + b;}; return add(a, b());`,
  `var add = (a, b) => a + b; return add(a, b());`,
];

describe('fparts (dynamic)', async () => {

  const matrix = new Possibilities(async, generator, name, params, body);

  matrix.forEach(item => {
    var result, result1, func, describeName;
    const [isAsync, isGenerator, name, params, body] = item;

    // Filters.
    if (isGenerator && isAsync) return;
    if (!params && body !== 'return 1;') return;
    if (params && body === 'return 1;') return;

    func = reconstruct({
      isAsync,
      isGenerator,
      name,
      params,
      body,
    });

    describeName = `${isAsync ? 'async ' : ''}function${isGenerator ? '*' : ''} ${name || ''}(${params || ''}) {
      ${body}
    }`;

    describe(describeName, () => {
      it ('should reconstruct correctly', async () => {
          let funcArg = () => 2;
          if (isGenerator) {
            result = func().next().value;
            result1 = func(1, funcArg).next().value;
          }
          else if (isAsync) {
            result = await func();
            result1 = await func(1, funcArg);
          }
          else {
            result = func();
            result1 = func(1, funcArg);
          }
          if (body === 'return 1;') {
            expect(result).to.eql(1);
          }
          else {
            expect(result).to.eql(3);
            expect(result1).to.eql(3);
          }
      });

      it ('should deconstruct correctly', () => {
        let obj = deconstruct(func);
        expect(obj).to.eql({
          isGenerator,
          isAsync,
          isArrowFunc: false,
          name,
          params,
          body,
        });
      });
    });

  });
});

describe ('fparts (custom)', () => {
  let obj = deconstruct(() => 1);
  it ('should deconstruct an arrow func without braces', () => {
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      isArrowFunc: true,
      name: null,
      params: null,
      body: 'return 1',
    });
  });

  let func = reconstruct(obj);
  it ('should reconstruct an arrow func without braces', () => {
    expect(func()).to.eql(1);
  });
});
