import app from '../app';

function LotteryCtrl(RequestService, MessageService) {
  const vm = this;

  vm.runLottery = () => {
    RequestService.post({ resource: 'lottery' }).then(() => {
      MessageService.addSuccess('Sorteio realizado com sucesso');
    }).catch(err => MessageService.addError(err.data.error));
  };
}

app.controller('LotteryCtrl', [
  'RequestService',
  'MessageService',
  LotteryCtrl,
]);
