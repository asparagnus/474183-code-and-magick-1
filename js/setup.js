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

  // функция возвращает объект wizard
  var getWizardObject = function () {
    var wizard = {
      name: wizardsParams.NAMES[getRandomIndex(wizardsParams.NAMES.length)] + ' ' +
        wizardsParams.SURNAMES[getRandomIndex(wizardsParams.SURNAMES.length)],
      coatColor: wizardsParams.COAT_COLORS[getRandomIndex(wizardsParams.COAT_COLORS.length)],
      eyesColor: wizardsParams.EYES_COLORS[getRandomIndex(wizardsParams.EYES_COLORS.length)]
    };
    return wizard;
  };

  // функция заполнения массива похожих персонажей
  var getWizards = function (count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push(getWizardObject());
    }
    return arr;
  };

  // функция создания DOM-элементов и заполнения их данными из массива
  var renderWizard = function (wizard) {
    var wizardElement = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item')
      .cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // функция отрисовки сгенерированных DOM-элементов
  var renderWizardElements = function () {
    var wizards = getWizards(wizardsParams.COUNT);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  // объект с экспортируемыми значениями в window
  window.setup = {
    COAT_COLORS: wizardsParams.COAT_COLORS,
    EYES_COLORS: wizardsParams.EYES_COLORS,
    FIREBALL_COLORS: wizardsParams.FIREBALL_COLORS,
    getRandomIndex: getRandomIndex
  };

  similarElement.classList.remove('hidden');
  renderWizardElements();
})();
