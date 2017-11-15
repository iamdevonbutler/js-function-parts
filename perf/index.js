const microtime = require('microtime');

const {deconstruct, reconstruct} = require('../lib');

const st = microtime.now();
var n = 1000000;
var i = n;
var str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nobis dignissimos, quas! Est asperiores ab beatae ex, dolor optio nostrum rerum aspernatur in corporis unde aperiam error fuga ut, illo?';

// @todo test against another module.
