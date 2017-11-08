const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;
// @todo exclude tests where generators are async.

class Possibilities {

  constructor(...args) {
    this._preprocessors = [];
    this._args = args;
    this._map = args.map(arg => this._fact(arg.length));
    this._matrix = this._buildMatrix();
  }

  _fact(num) {
    var obj = [];
    if (num > 0) {
      let i = 0;
      while (num--) {
        obj.push(i);
        i++;
      }
      return obj;
    }
    return false;
  }

  _buildMatrix(i = 0) {
    var result = [];
    this._map[i].forEach(data => {
      if (i < this._map.length - 1) {
        let obj = this._buildMatrix(i + 1);
        obj.forEach(item => result.push([data, ...item]));
      }
      else {
        result.push(this._map[i]);
      }
    });
    return result;
  }

  preprocess(obj) {
    this._preprocessors.push(obj);
  }

  run() {
    return this._matrix.map(data => {
      return data.map((item, i) => {
        return this._args[i][item];
      });
    });
  }

}

const {deconstruct, reconstruct} = require('../lib');

// deconstruct();

// reconstruct();

//
// async
// generator
// params
// body
// name
//

var async = [
  '',
  'async ',
];

var generator = [
  '',
  '*',
];

var name = [
  '',
  'a',
  'aa',
];

var params = [
  '',
  'a',
  'a, b',
];

var body = [
  'return 1;',
];





var x;

describe('fparts', async () => {
  var obj = new Possibilities(async, generator, name, params, body);

  // obj.preprocess((item) => {
  //   if (a === 0) return b !== 0;
  // });

  var matrix = obj.run();
  console.log(matrix);

  matrix.forEach(async item => {
    var result, func, describeName;
    const [isAsync, isGenerator, name, params, body] = item;

    func = reconstruct({
      isAsync,
      isGenerator,
      name,
      params,
      body,
    });

    describeName = item.map(val => !val ? "''" : val).join(' ');
    describe(`(${describeName})`, () => {
      it ('should reconstruct correctly', async (done) => {
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
      });

      obj = deconstruct(func);

      it ('should deconstruct correctly', () => {
        console.log(obj);
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










// // @todo tests arrow func vs regular for ctx.
// describe('fparts.reconstruct()', () => {
//   it('should reconstruct all function types', () => {
//     var obj = {
//       isGenerator: false,
//       isAsync: false,
//       name: null,
//       params: null,
//       body: 'return 1',
//     };
//   });
// });
//
// describe('fparts.deconstruct()', () => {
//
//   it('should deconstruct an anonmyous function (0)', () => {
//     var func = () => {};
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: false,
//       isAsync: false,
//       name: null,
//       params: null,
//       body: null,
//     });
//   });
//
//   it('should deconstruct an anonmyous function (1)', () => {
//     var func =  () => {console.log(1)};
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: false,
//       isAsync: false,
//       name: null,
//       params: null,
//       body: 'console.log(1)',
//     });
//   });
//
//   it('should deconstruct an anonmyous function (2)', () => {
//     var func = () => console.log(1);
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: false,
//       isAsync: false,
//       name: null,
//       params: null,
//       body: 'console.log(1)',
//     });
//   });
//
//   it('should deconstruct an async function (0)', () => {
//     var func = async () => console.log(1);
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: false,
//       isAsync: true,
//       name: null,
//       params: null,
//       body: 'console.log(1)',
//     });
//   });
//
//   it('should deconstruct an async function (1)', () => {
//     var func = async() => console.log(1);
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: false,
//       isAsync: true,
//       name: null,
//       params: null,
//       body: 'console.log(1)',
//     });
//   });
//
//   it('should deconstruct an generator function (0)', () => {
//     var func = function* () { console.log(1) };
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: true,
//       isAsync: false,
//       name: null,
//       params: null,
//       body: 'console.log(1)',
//     });
//   });
//
//   it('should deconstruct an generator function (1)', () => {
//     var func = function * () { console.log(1) };
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: true,
//       isAsync: false,
//       name: null,
//       params: null,
//       body: 'console.log(1)',
//     });
//   });
//
//   it('should deconstruct an generator function (2)', () => {
//     var func = function *() { console.log(1) };
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: true,
//       isAsync: false,
//       name: null,
//       params: null,
//       body: 'console.log(1)',
//     });
//   });
//
//   it('should deconstruct an generator function (3)', () => {
//     var func = function * aa() {function aaa() {return 2;}return aaa();};
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: true,
//       isAsync: false,
//       name: 'aa',
//       params: null,
//       body: 'function aaa() {return 2;}return aaa();',
//     });
//   });
//
//   it('should deconstruct a complex function (0)', async () => {
//     var func = async function (a, b = 2, c = () => 3) {
//       function aaa(a,b,c) {
//         return a + b + c;
//       }
//       return aaa(a,b,c());
//     };
//
//     var obj = deconstruct(func);
//     expect(obj).to.eql({
//       isGenerator: false,
//       isAsync: true,
//       name: null,
//       params: 'a, b = 2, c = () => 3',
//       body: 'function aaa(a,b,c) {\n        return a + b + c;\n      }\n      return aaa(a,b,c());',
//     });
//
//     var func1 = reconstruct(obj);
//     var result = await func1(1,2,() => 3);
//     result.should.eql(6);
//   });
//
// });
