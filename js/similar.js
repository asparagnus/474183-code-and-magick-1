'use strict';

// загрузка и обновление похожих магов
(function () {
  var wizards = [];

  // функция отрисовки полученных с сервера объектов
  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  // возвращает оценку похожести
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.wizardPlayer.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.wizardPlayer.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // функция для сортировки в алфавитном порядке
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // функция обновляет похожих волшебников
  var updateWizards = function () {
    window.renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  // функция-обработчик изменения цвета плаща
  window.wizardPlayer.onCoatChange = window.debounce(updateWizards);

  // функция-обработчик изменения цвета глаз
  window.wizardPlayer.onEyesChange = window.debounce(updateWizards);

  // загружаются данные с сервера
  window.backend.load(onLoad, window.utils.onError);

  // экспортируемый метод
  window.updateWizards = updateWizards;

})();
