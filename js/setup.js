'use strict';

// отрисовывает похожих магов
(function () {
  var wizardsParams = {
    COUNT: 4,
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarElement = document.querySelector('.setup-similar');

  // функция возвращает случайный индекс
  var getRandomIndex = function (max) {
    return Math.floor(Math.random() * max);
  };

  // функция создания DOM-элементов и заполнения их данными из массива
  var renderWizard = function (wizard) {
    var wizardElement = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item')
      .cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // функция отрисовки полученных с сервера объектов
  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsParams.COUNT; i++) {
      var temp = wizards[getRandomIndex(wizards.length)];
      fragment.appendChild(renderWizard(temp));
    }
    similarListElement.appendChild(fragment);
    similarElement.classList.remove('hidden');
  };

  window.backend.load(onLoad, window.utils.onError);

  // объект с экспортируемыми значениями в window
  window.setup = {
    COAT_COLORS: wizardsParams.COAT_COLORS,
    EYES_COLORS: wizardsParams.EYES_COLORS,
    FIREBALL_COLORS: wizardsParams.FIREBALL_COLORS,
    getRandomIndex: getRandomIndex
  };
})();
