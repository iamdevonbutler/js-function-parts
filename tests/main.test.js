// @todo exclude tests where generators are async.
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const Possibilities = require('possibilities');
const {deconstruct, reconstruct} = require('../lib');

// @rodo do we need to do it like this for async and generator???? async space???
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
  'a',
  'a, b',
];

const body = [
  'return 1;',
];

describe('fparts', async () => {

  const matrix = new Possibilities(async, generator, name, params, body);

  matrix.forEach(item => {
    var result, func, describeName;
    const [isAsync, isGenerator, name, params, body] = item;

    if (isGenerator && isAsync) return;

    func = reconstruct({
      isAsync,
      isGenerator,
      name,
      params,
      body,
    });

    describeName = `${isAsync ? 'async ' : ''}function${isGenerator ? '*' : ''} ${name || ''}(${params || ''}) {${body}}`;
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
          expect(result).to.eql(1);
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
