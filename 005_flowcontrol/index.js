// Flow Control

// Series

const flow = require('nimble');

flow.series([
  function (callback) {
    setTimeout( function () {
      console.log('I execute first.');

      callback();
    }, 1000);
  },

  function (callback) {
    setTimeout( function () {
      console.log('I execute next.');

      callback();
    }, 500);
  },

  function (callback) {
    setTimeout( function () {
      console.log('I execute last.');

      callback();
    }, 100);
  },

  function (callback) {
    // Parallel
    flow.parallel([
      function (callback) {
        setTimeout( function () {
          console.log('Activity 1 completed after 1 sec.');
          callback();
        }, 1000);
      },
      function (callback) {
        setTimeout( function () {
          console.log('Activity 2 completed after 1 sec.');
          callback();
        }, 1000);
      }
    ], callback); // callback here to allow series to go on!
  },

  function (callback) {
    setTimeout( function () {
      console.log('All task completed.');

      callback();
    }, 1000);
  }
]);
