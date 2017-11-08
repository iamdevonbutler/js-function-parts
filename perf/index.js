const microtime = require('microtime');

const {deconstruct, reconstruct} = require('../lib');

const st = microtime.now();
var n = 1000000;
var i = n;
var str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nobis dignissimos, quas! Est asperiores ab beatae ex, dolor optio nostrum rerum aspernatur in corporis unde aperiam error fuga ut, illo?';


// async
//
//

// @todo does this support classes inside of functions?

// function() {}
// function*() {}
// function name() {}
// function* name() {}
// {
//   name: function() {},
//   name1: () => {},
//   name1: ()* => {},
//   name2() {},
// }
// var name = function() {};
// var name = function*() {};


// @todo default value for func params
// @todo function params are functions
// @todo unit test deconstructFunction needs it.
// @todo make sure recursion works. how to call self. make a note in the docs.

// obj = {
//   function aaa(param, param1 = null) {console.log(44);},
//   function() {console.log(1);},
//   () => {console.log(1);},
//   function* () {},
//   function* aaa () {},
//   name3() {console.log(1);},
//   async function() {console.log(1);},
//   async function aaa() {console.log(1);},
//   async () => {console.log(1);},
// };

console.log(obj);
return;

// while (i--) {
//   var x = 1;
// }

const ms = (microtime.now() - st) / 1000;

console.log(ms);
console.log( (n / (ms / 1000)).toLocaleString() );
