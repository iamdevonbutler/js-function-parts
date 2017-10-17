const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const parts = require('../lib');

describe('jsonf', () => {

  it('should deconstruct an anonmyous function (0)', () => {
    var obj = parts( () => {} );
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      name: null,
      params: null,
      body: null,
    });
  });

  it('should deconstruct an anonmyous function (1)', () => {
    var obj = parts( () => {console.log(1)} );
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an anonmyous function (2)', () => {
    var obj = parts( () => console.log(1) );
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an async function (0)', () => {
    var obj = parts( async () => console.log(1) );
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: true,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an async function (1)', () => {
    var obj = parts( async() => console.log(1) );
    expect(obj).to.eql({
      isGenerator: false,
      isAsync: true,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (0)', () => {
    var obj = parts( function* () { console.log(1) } );
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (1)', () => {
    var obj = parts( function * () { console.log(1) } );
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (2)', () => {
    var obj = parts( function *() { console.log(1) } );
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: null,
      params: null,
      body: 'console.log(1)',
    });
  });

  it('should deconstruct an generator function (3)', () => {
    var obj = parts(function * aa() {function aaa() {return 2;}return aaa();});
    expect(obj).to.eql({
      isGenerator: true,
      isAsync: false,
      name: 'aa',
      params: null,
      body: 'function aaa() {return 2;}return aaa();',
    });
  });

  it('should should', () => {
    var obj = parts(function aa() {
      function aaa() {
        return 2;
      }
      return aaa();
    });
    console.log(obj);
  });

});

// function type | async | generator | name | params | body

// var trials = [];
//
// var types = [
//   (isAsync) => {
//     return `${isAsync ? 'async ' : ''}${}`;
//   }
// ];



// describe(() => {
//
//
//
//
// });
