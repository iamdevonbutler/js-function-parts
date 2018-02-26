# js-function-parts [![Build Status](https://travis-ci.org/iamdevonbutler/js-function-parts.svg?branch=master)](https://travis-ci.org/iamdevonbutler/js-function-parts)

low-level function parser optimized for performance.

`.deconstruct()` JS functions into objects containing:

`.reconstruct()` objects into functions.

 **Params**
- isAsync
- isGenerator
- isArrowFunc
- name
- params
- body

*Syntax is generous - if it's valid JS, js-function-parts should parse the input properly.*

**engines: node >= 8.x**

## Example

```javascript
const {deconstruct, reconstruct} = require('js-function-parts');

var obj = deconstruct(function() {return null;});

console.log(obj);
// obj.isAsync = false
// obj.isGenerator = false
// obj.isArrowFunc = true
// obj.name = null
// obj.params = null
// obj.body = 'return null;'

var func = reconstruct(obj);
func(); // returns `null`.
```

## Installation

```
npm i js-function-parts --save
```

## API

### .deconstruct()

**Arguments**

- func {Function}

**Returns** {Object}

```javascript
var obj = deconstruct(function() {});
console.log(obj);
/*
{
  isAsync: false,
  isGenerator: false,
  isArrowFunc: false,
  name: null,
  params: null,
  body: null,
}
*/
```

### .reconstruct()

**Arguments**

- obj {Object} a parts object

**Returns** {Function}

```javascript
var func = reconstruct({
  isAsync: false,
  isGenerator: false,
  name: 'name',
  params: 'a, b',
  body: 'return 1;',
});
```

## License
MIT
