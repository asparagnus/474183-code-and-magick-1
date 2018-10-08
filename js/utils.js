'use strict';

(function () {

  var keycodes = {
    ESC: 27,
    ENTER: 13
  };

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === keycodes.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === keycodes.ENTER) {
        action();
      }
    }
  };
})();
