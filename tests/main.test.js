const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const fparts = require('../lib');

describe('fparts', () => {

  it('should deconstruct an anonmyous function (0)', () => {
    var func = () => {};
    var obj = fparts(func);
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
    var obj = fparts(func);
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
    var obj = fparts(func);
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
    var obj = fparts(func);
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
    var obj = fparts(func);
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
    var obj = fparts(func);
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
    var obj = fparts(func);
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
    var obj = fparts(func);
    console.log(obj);
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
    var obj = fparts(func);
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: 'aa',
      params: null,
      body: 'function aaa() {return 2;}return aaa();',
    });
  });

  it('should should', () => {
    var obj = fparts(function aa() {
      function aaa() {
        return 2;
      }
      return aaa();
    });
    console.log(obj);
  });

});
