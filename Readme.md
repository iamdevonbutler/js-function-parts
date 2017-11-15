# fparts

low-level function parser optimized for performance.

*Deconstruct* JS functions into objects containing:

- isAsync
- isGenerator
- isArrowFunc
- name
- params
- body

Syntax is generous - if it's valid JS, fparts should parse the input properly.

*Reconstruct* objects into functions.

*We can `deconstruct` arrow functions and provide the metadata to identify it as such,
but we cannot create an arrow function via the `reconstruct` method. Why? Arrow functions
inherit context from the environment in which it's defined, and since that context exists
outside your codebase, context for arrow functions becomes meaningless.*

---

```javascript
const {deconstruct, reconstruct} = require('fparts');

var obj = deconstruct(function() {
  return null;
});

console.log(obj);
// obj.isAsync = false
// obj.isGenerator = false
// obj.isArrowFunc = false
// obj.name = null
// obj.params = null
// obj.body = 'return null;'

var func = reconstruct(obj);
func(); // returns null.

```

## Installation

```
npm i fparts --save
```

## API

### .deconstruct()

**Arguments**

func {Function}

**Returns** {Object}

```javascript
var obj = deconstruct(function() {});
obj === {
  isAsync: false,
  isGenerator: false,
  isArrowFunc: false,
  name: null,
  params: null,
  body: null,
}
```

### .reconstruct()

**Arguments**

obj {Object} the parts object

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


## Performance


## License
MIT
