// Slightly hacky way (thanks, StackOverflow) to declare all the dependencies
// so both the application and tests can load everything correctly.
// The dependencies listed in this file are for the "business logic" of the app.
(function() {

  function load(url) {
    document.write('<script src="' + url + '"></script>');
  }

  load('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js');

  load('src/logic/cards.js');
  load('src/logic/hands.js');
  load('src/logic/scoring.js');
  load('src/logic/util.js');

})();