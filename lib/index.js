const self = module.exports;

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const AsyncArrowFunction = Object.getPrototypeOf(async () => {}).constructor;
const ArrowFunction = Object.getPrototypeOf(() => {}).constructor;
const GenFunction = Object.getPrototypeOf(function* (){}).constructor;

self.reconstruct = (obj, arrowFunc = false) => {
  var func;
  console.log(obj);
  const {isAsync, isGenerator, name, params, body} = obj;

  if (isGenerator) {
    func = new GenFunction(params, body);
  }
  else {
    if (isAsync) {
      if (arrowFunc) {
        func = new AsyncArrowFunction(params, body);
      }
      else {
        func = new AsyncFunction(params, body);
      }
    }
    else {
      if (arrowFunc) {
        func = new ArrowFunction(params, body);
      }
      else {
        console.log(999);
        func = new Function(params, body);
      }
    }
  }
  if (name) {
    Object.defineProperty(func, 'name', {value: name});
  }
  return func;
};

self.deconstruct = (func) => {
  var str, i = 0, isAsync, isGenerator, functionKeyword, name, params, body, nameTmp = '',
    paramsTmp = '', openSingleQuotes = false, openDoubleQuotes = false, openParens = 0;

  str = func.toString();

  isAsync = str[0] === 'a'
    && str[1] === 's'
    && str[2] === 'y'
    && str[3] === 'n'
    && str[4] === 'c';

  if (isAsync) {
    i += 5;
    if (str[i] === ' ') i += 1;
  };

  functionKeyword = str[i] === 'f'
    && str[i + 1] === 'u'
    && str[i + 2] === 'n'
    && str[i + 3] === 'c'
    && str[i + 4] === 't'
    && str[i + 5] === 'i'
    && str[i + 6] === 'o'
    && str[i + 7] === 'n';

  if (functionKeyword) i += 8;

  while (1) {
    if (isGenerator === undefined) {
      if (str[i] === ' ') {
        i++;
        continue;
      }
      if (str[i] === '*') {
        isGenerator = true;
      }
      else {
        isGenerator = false;
        nameTmp += str[i];
      }
    }
    else if (name === undefined) {
      if (nameTmp === '(') {
        name = null;
        openParens++;
        if (str[i] === ')') {
          openParens--;
          params = null;
        }
        else {
          paramsTmp += str[i];
        }
      }
      else if (str[i] === '(') {
        name = nameTmp.trim() || null;
        openParens++;
      }
      else {
        nameTmp += str[i];
      }
    }
    else if (params === undefined) {
      if (str[i] === '"') {
        openDoubleQuotes = str[i-1] !== '\\' ? !openDoubleQuotes : openDoubleQuotes;
      }
      else if (str[i] === "'") {
        openSingleQuotes = str[i-1] !== '\\' ? !openSingleQuotes : openSingleQuotes;
      }
      else if (str[i] === '(' && !openSingleQuotes && !openDoubleQuotes) {
        openParens++;
      }
      else if (str[i] === ')' && !openSingleQuotes && !openDoubleQuotes) {
        openParens--;
        if (!openParens) {
          params = paramsTmp.trim() || null;
        }
      }
      paramsTmp += str[i];
    }
    // Parse body...
    else {
      let str1 = str.slice(i).trim();
      let ii = 0;
      if (str1[ii] === '{') {
        body = str1.slice(1,-1).trim() || null;
      }
      else if (str1[ii] === '=' && str1[ii+1] === '>') { //@todo maybe make this a else statement, if syntax is implied
        str1 = str1.slice(ii+2).trim();
        if (str1[str1.length - 1] === '}') {
          body = str1.slice(1,-1).trim() || null;
        }
        else {
          body = str1 || null;
        }
      }
      return {name, params, body, isGenerator, isAsync};
    }
    i++;
  }
};
