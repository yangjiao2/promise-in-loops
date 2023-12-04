/*
  Array Reduce: this execute the async promise one by one. 
  We can derive result by using ".then" since it will have resolved result for each item in array;  
  If initialValue is specified, callbackFn starts executing with the first value in the array as currentValue. 
  
  Array reduce definition: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
*/
function testPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processing ${time}`);
      resolve(time);
    }, time);
  });
}

let timeouts = [3000, 2000, 1000, 4000];
let results = [];
const start = Date.now();
let resultPromise = timeouts.reduce((accumulatorPromise, nextTimeout) => {
  return accumulatorPromise.then(() => { 
    return testPromise(nextTimeout);
  }).then((result) => { logger(result, Date.now() - start);
    results.push(result);
  });
}, Promise.resolve());

resultPromise.then(() => {
  console.log("All Promises Resolved !!✨", results);
});
