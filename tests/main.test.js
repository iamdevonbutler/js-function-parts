// @todo test to see if u can pass in params
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
];

const body = [
  'return 1;',
  `function add(a, b) {return a + b;}; return add(a, b());`,
  `var add = (a, b) => a + b; return add(a, b());`,
];

describe('fparts', async () => {

  const matrix = new Possibilities(async, generator, name, params, body);

  matrix.forEach(item => {
    var result, func, describeName;
    const [isAsync, isGenerator, name, params, body] = item;

    if (isGenerator && isAsync) return;
    if (!params && body !== 'return 1;') return;

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

      it ('should reconstruct correctly', done => {
        (async () => {
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
          done();
        })();
      });

      it ('should deconstruct correctly', () => {
        obj = deconstruct(func);
        expect(obj).to.eql({
          isGenerator,
          isAsync,
          name,
          params,
          body,
        });
      });

    });

  });
});
