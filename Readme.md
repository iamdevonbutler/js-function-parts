# fparts

low-level function parser optimized for performance.

Parse JS functions into objects containing:

- name
- params
- body
- isAsync
- isGenerator

Syntax is generous - if it's valid JS fparts should parse the input properly.

---

```javascript
const {deconstruct} = require('fparts');

var obj = deconstruct(function() {
  return null;
});

console.log(obj);
// obj.name = null
// obj.params = null
// obj.body = 'return null;'
// obj.isAsync = false
// obj.isGenerator = false

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
{
  name,
  params,
  body,
  isAsync,
  isGenerator,
}
```

### .reconstruct()

**Arguments**

obj {Object} the parts object - result of `fparts.deconstruct()`

**Returns** {Function}


## Performance
@todo

## License
MIT
