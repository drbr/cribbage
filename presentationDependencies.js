// Slightly hacky way (thanks, StackOverflow) to declare all the dependencies
// so both the application and tests can load everything correctly.
// The dependencies listed in this file are for the presentation layer of the app.
(function() {

  function loadScript(url) {
    document.write('<script src="' + url + '"></script>');
  }

  function loadStylesheet(url) {
    document.write('<link rel="stylesheet" href="' + url + '">'); 
  }

  // 3rd party dependencies
  loadScript('https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.js');
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.14/angular-ui-router.js');
  loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js');
  loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js');
  loadStylesheet('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css');

  // The web app
  loadScript('src/app/angular/app.js');
  loadScript('src/app/angular/directives/crCardSelector.js');
  loadScript('src/app/angular/directives/crHandScore.js');
  loadScript('src/app/angular/directives/crStarterScores.js');
  loadScript('src/app/angular/filters.js');

  loadStylesheet('src/app/cribbage.css');
})();