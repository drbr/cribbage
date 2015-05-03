// Slightly hacky way (thanks, StackOverflow) to declare all the dependencies
// so both the application and tests can load everything correctly
(function() {

  function load(url) {
    document.write('<script src="' + url + '"></script>');
  }

  // 3rd party runtime dependencies
  //load('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js');
  //load('https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js');

  // Local application code
  load('src/logic.js');
  load('src/cards.js');
  load('src/scoring.js');

})();