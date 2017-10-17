const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const {deconstruct, reconstruct} = require('../lib');

describe('fparts.deconstruct()', () => {

  it('should deconstruct an anonmyous function (0)', () => {
    var func = () => {};
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      name: null,
      params: null,
      body: null,
    });
  });

  it('should deconstruct an anonmyous function (1)', () => {
    var func =  () => {console.log(1)};
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an anonmyous function (2)', () => {
    var func = () => console.log(1);
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an async function (0)', () => {
    var func = async () => console.log(1);
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: true,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an async function (1)', () => {
    var func = async() => console.log(1);
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: true,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (0)', () => {
    var func = function* () { console.log(1) };
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (1)', () => {
    var func = function * () { console.log(1) };
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (2)', () => {
    var func = function *() { console.log(1) };
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (3)', () => {
    var func = function * aa() {function aaa() {return 2;}return aaa();};
    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: 'aa',
      params: null,
      body: 'function aaa() {return 2;}return aaa();',
    });
  });

  it('should deconstruct a complex function (0)', async () => {
    var func = async function (a, b = 2, c = () => 3) {
      function aaa(a,b,c) {
        return a + b + c;
      }
      return aaa(a,b,c());
    };

    var obj = deconstruct(func);
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: true,
      name: null,
      params: 'a, b = 2, c = () => 3',
      body: 'function aaa(a,b,c) {\n        return a + b + c;\n      }\n      return aaa(a,b,c());',
    });

    var func1 = reconstruct(obj);
    var result = await func1(1,2,() => 3);
    result.should.eql(6);
  });

});
