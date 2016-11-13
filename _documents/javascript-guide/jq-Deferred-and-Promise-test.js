console.clear();

var doSomethingLater = function (fn, time) {
  var dfd = $.Deferred();

  setTimeout(function () {
    dfd.resolve(fn());
  }, time || 0);

  return dfd.promise();
}

var makePromise = function (functionNumber) {
  return doSomethingLater(function () {
    console.log("Function " + functionNumber + " executed after " + functionNumber + " seconds");
  }, functionNumber * 1000);
};

var promises = [];
for (var i = 1; i <= 7; i++) {
  promises[i] = makePromise(i);
}

$.when(promises[1], promises[2], promises[3], promises[4], promises[5], promises[6], promises[7]).done(function (promise1, promise2) {
  console.log("All functions completed");
});


// This one definitely triggers the done() after EITHER completes.
/*
promise1.then(promise2).done(function(promise1, promise2) {
  // Handle both XHR objects
  console.log("One function completed");
});
*/

//console.log(sum);
