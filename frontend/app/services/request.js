import app from '../app';

function RequestService($resource, { URL_API }) {
  return {
    query(params) {
      return $resource(`${URL_API}/:resource`, {
        resource: '@resource',
      }, {
        get: { method: 'get', isArray: true, cancellable: true },
      }).get(params).$promise;
    },
    get(params) {
      return $resource(`${URL_API}/:resource/:id`, {
        resource: '@resource',
        id: '@id',
      }).get(params).$promise;
    },
    post(params, data) {
      return $resource(`${URL_API}/:resource`, {
        resource: '@resource',
      }, {
        post: { method: 'POST' },
      }).post(params, data).$promise;
    },
    update(params, data) {
      return $resource(`${URL_API}/:resource/:id`, {
        resource: '@resource',
        id: '@id',
      }, {
        update: { method: 'PUT' },
      }).update(params, data).$promise;
    },
    delete(params) {
      return $resource(`${URL_API}/:resource/:id`, {
        resource: '@resource',
        id: '@id',
      }).delete(params).$promise;
    },
  };
}

app.service('RequestService', [
  '$resource',
  'config',
  RequestService,
]);
