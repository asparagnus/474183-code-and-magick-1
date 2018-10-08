'use strict';

(function () {

  var keycodes = {
    ESC: 27,
    ENTER: 13
  };

  // функция-обработчик срабатывает при нажатии на клавишу ESC
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === keycodes.ESC) {
      action();
    }
  };

  // функция-обработчик срабатывает при нажатии на клавишу ENTER
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === keycodes.ENTER) {
      action();
    }
  };

  // функция добавляет в дом сообщение с ошибкой от сервера
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    onError: onError
  };
})();
