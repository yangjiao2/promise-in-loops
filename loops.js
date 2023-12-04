
/*
  Array map: this execute the async promise one by one. 
  This will execute simulataenously and result returned is based on time required for execution (if using Array.push) 
  Array for each definition: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/

let timeouts = [3000, 2000, 1000, 4000];
let results = [];
const start = Date.now();

// Use array.map to create an array of promises
let promises = timeouts.map((nextTimeout) => {
  logger(result, Date.now() - start);
  return testPromise(nextTimeout);
});

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then(() => {
    console.log("All Promises Resolved !!✨", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });




/*
  Array forEach: this execute the simultaneously (all starts together).
  This will execute simultaneously and result returned is based on time required for execution (if using Array.push) 
  Array for each definition: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
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

timeouts.forEach((nextTimeout) => {
  testPromise(nextTimeout)
    .then((result) => {
      logger(result, Date.now() - start);
      results.push(result);
    })
    .catch((error) => {
      console.error(`Error processing ${nextTimeout}:`, error);
    });
});

// For simplicity, I'm logging the results after a delay
setTimeout(() => {
  console.log("All Promises Resolved !!✨", results);
}, Math.max(...ids) + 1000); 

/*
  Result output:
  

Processing 1000
1000 finished waiting 1 seconds later.
Processing 2000
2000 finished waiting 2 seconds later.
Processing 3000
3000 finished waiting 3 seconds later.
Processing 4000
4000 finished waiting 4 seconds later.
All Promises Resolved !!✨ (4) [1000, 2000, 3000, 4000]
*/ 



/*
  Array Reduce: this execute the async promise one by one. 
  We can derive result by using ".then" since it will have resolved result for each item in array;  
  
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
  }).then((result) => { 
    logger(result, Date.now() - start);
    results.push(result);
  });
}, Promise.resolve());

resultPromise.then(() => {
  console.log("All Promises Resolved !!✨", results);
});

/*
>  Result output:
  
Processing 3000
3000 finished waiting 3 seconds later.
Processing 2000
2000 finished waiting 5 seconds later.
Processing 1000
1000 finished waiting 6 seconds later.
Processing 4000
4000 finished waiting 10 seconds later.
All Promises Resolved !!✨ (4) [3000, 2000, 1000, 4000]
*/ 


function logger(value, diffInMS) {
    return console.log(
      `${value} finished waiting ${Math.round(diffInMS / 1000)} seconds later.`
    );
  };
