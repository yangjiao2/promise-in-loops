/*
  For of loop: unpack items from array and execute async function in input order with main thread blocking for each.
  This is conceptually same as Array.reduce (which listed down below).
*/

let timeouts = [3000, 2000, 1000, 4000];
let results = [];
const start = Date.now();

// Define an async function to use await inside the loop
async function processTimeouts() {
  for (const nextTimeout of timeouts) {
    try { 
      // Use await inside the loop to wait for each promise to resolve
      const result = await testPromise(nextTimeout); logger(result, Date.now() - start);
      results.push(result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Log the results and total time after all promises are resolved
  logger(results, Date.now() - start);
  console.log("All Promises Resolved !!✨", results);
}

processTimeouts()


/*
  Result output:

Processing 3000
3000 finished waiting 3 seconds later.
Processing 2000
2000 finished waiting 5 seconds later.
Processing 1000
1000 finished waiting 6 seconds later.
Processing 4000
4000 finished waiting 10 seconds later.
3000,2000,1000,4000 finished waiting 10 seconds later.
All Promises Resolved !!✨ (4) [3000, 2000, 1000, 4000]
*/




/*
  For of loop + Promise.all: unpack items from array and execute simulataenously and 
  result will be arranged in order👍.
  This is conceptually same as Array.map (which listed in the next block.
*/

let timeouts = [3000, 2000, 1000, 4000];
let results = [];
const start = Date.now();

// Use array.map to create an array of promises
let promises = timeouts.map((nextTimeout) => {
  
  return testPromise(nextTimeout);
});


// Use for...of loop to iterate over timeouts and create promises
for (const nextTimeout of timeouts) {
  promises.push(testPromise(nextTimeout));
}

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    logger(results, Date.now() - start);
    console.log("All Promises Resolved !!✨", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/*
  Result output:

Processing 1000
Processing 2000
Processing 3000
Processing 4000
3000,2000,1000,4000 finished waiting 4 seconds later.
All Promises Resolved !!✨ (4) [3000, 2000, 1000, 4000]
*/ 



/*
  Array map: this maps async promises in an array and we can use Promise.all or Promise.allSettled to execute, which will also execute simulataenously and 
  result will be arranged in order👍.

*/

let timeouts = [3000, 2000, 1000, 4000];
let results = [];
const start = Date.now();

// Use array.map to create an array of promises
let promises = timeouts.map((nextTimeout) => {
  
  return testPromise(nextTimeout);
});

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {logger(results, Date.now() - start);
    console.log("All Promises Resolved !!✨", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/*
  Result output:

Processing 1000
Processing 2000
Processing 3000
Processing 4000
All Promises Resolved !!✨ (4) [3000, 2000, 1000, 4000]
*/ 


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
