const tokens = {
  '{': 'curly__open',
  '}': 'curly__close',
  '(': 'round__open',
  ')': 'round__close',
  '[': 'quart__open',
  ']': 'quart__close'
};
const tokenNames = Object.keys(tokens);


const re = /^(.*)__(.*)$/;

const test1 = '({a})';
const test2 = '[fatality({a})]';
const test3 = '[{({a})]';
const test4 = '[{({a}})]';

// tail :: [t] -> t
const tail = a => a.slice(-1).reduce(x => x);

// head :: [h] -> h
const head = a => a.slice(0, 1).reduce(x => x);
/* token model
    {
      token: token,
      position: index
    }
*/
const getToken = (token, idx) => ({token: tokens[token], position: idx});

/**
 * @function
 * @param {String} expr
 * @returns {Boolean}
*/
function bracketsTest(expr) {
  let found = [];

  // tokenize open and close brackets with loop of all expr
  for (let i = 0; i < expr.length; i += 1) {
    const char = expr[i];

    if (tokenNames.indexOf(char) !== -1) {
      found.push(getToken(char, i));
    }
  }

  // if length 0 - true
  if (found.length === 0) {
    return true;
  }

  // check for even length (brackets must be open and closed)
  if (found.length % 2 !== 0) {
    return false;
  }

  // if pairs occurs first open must close last
  for(let i = 0; i < found.length / 2; i += 1) {
    const opener = found[i].token;
    const closer = found[found.length - 1 - i].token

    if(opener.replace(re, "$1__close") !== closer) {
      return false;
    }
  }
  return true;
}

console.log(bracketsTest(test1));
console.log(bracketsTest(test2));
console.log(bracketsTest(test3));
console.log(bracketsTest(test4));
