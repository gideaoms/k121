import app from '../app';
import homeTemplate from '../views/home.html';

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: homeTemplate,
      });

    $urlRouterProvider.otherwise('/');
  },
]);
