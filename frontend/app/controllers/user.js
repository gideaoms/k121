import app from '../app';

function UserListCtrl($state, RequestService, MessageService) {
  const vm = this;

  const refresh = () => {
    RequestService.query({ resource: 'users' }).then((response) => {
      vm.users = response;
    });
  };

  vm.delete = (id) => {
    RequestService.delete({ resource: 'users', id }).then(() => {
      MessageService.addSuccess('Usuário excluído com sucesso');
      refresh();
    });
  };

  refresh();
}

function UserFormCtrl($state, $stateParams, RequestService, MessageService) {
  const vm = this;

  if ($stateParams.id) {
    RequestService.get({ resource: 'users', id: $stateParams.id })
      .then((response) => {
        vm.user = response;
      });
  }

  vm.save = () => {
    const method = $stateParams.id ? 'update' : 'post';
    RequestService[method]({ resource: 'users', id: $stateParams.id }, vm.user)
      .then(() => {
        MessageService.addSuccess('Usuário adicionado com sucesso');
        $state.go('user.list');
      })
      .catch(err => MessageService.addError(err.data.map(error => error.msg)));
  };
}

app
  .controller('UserListCtrl', [
    '$state',
    'RequestService',
    'MessageService',
    UserListCtrl,
  ])
  .controller('UserFormCtrl', [
    '$state',
    '$stateParams',
    'RequestService',
    'MessageService',
    UserFormCtrl,
  ]);
