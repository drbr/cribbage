// Slightly hacky way (thanks, StackOverflow) to declare all the dependencies
// so both the application and tests can load everything correctly.
// The dependencies listed in this file are for the "business logic" of the app.
(function() {

  function load(url) {
    document.write('<script src="' + url + '"></script>');
  }

  load('src/logic/cards.js');
  load('src/logic/hands.js');
  load('src/logic/scoring.js');

})();