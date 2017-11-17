'use strict';

// @todo tesrt to make sure it errors when we try to create a arrow generator.
// @todo how does it parse arrow functs w/o braces/
// @todo might want to leave body spacing the same.

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
    var result, func, describeName;
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
          if (isGenerator) {
            let obj = func();
            result = obj.next().value;
          }
          else if (isAsync) {
            result = await func();
          }
          else {
            result = func();
          }
          if (body === 'return 1;') {
            expect(result).to.eql(1);
          }
          else {
            expect(result).to.eql(3);
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
  it ('should work w/ passed params rather than defaults', () => {
    let func = reconstruct({
      isAsync: false,
      isGenerator: false,
      name: null,
      params: 'a,b',
      body: 'return a+b;',
    });
    func(1,1).should.eql(2);
  });
  it ('should deconstruct an arrow func', () => {
    let obj = deconstruct(() => 1);
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      isArrowFunc: true,
      name: null,
      params: null,
      body: '1',
    });
  });
});
