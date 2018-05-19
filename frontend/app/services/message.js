import app from '../app';

function MessageService(toastr) {
  const addMsg = (msgs, title, method) => {
    if (msgs) {
      if (msgs instanceof Array) {
        msgs.forEach(msg => toastr[method](msg.message || msg, title));
      } else {
        toastr[method](typeof msgs === 'string' ? msgs : msgs.message, title);
      }
    }
  };

  function addSuccess(msgs) {
    addMsg(msgs, 'Sucesso', 'success');
  }

  function addError(msgs) {
    addMsg(msgs, 'Erro', 'error');
  }

  return { addSuccess, addError };
}

app.service('MessageService', [
  'toastr',
  MessageService,
]);
