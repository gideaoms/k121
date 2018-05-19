import app from '../app';
import list from '../views/users/list.html';
import form from '../views/users/form.html';

app.config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/users',
        abstract: true,
        template: '<ui-view/>',
      })
      .state('user.list', {
        url: '/list',
        template: list,
      })
      .state('user.edit', {
        url: '/:id/edit',
        template: form,
      })
      .state('user.new', {
        url: '/new',
        template: form,
      });
  },
]);
