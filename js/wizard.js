'use strict';

// модуль, описывающий события с магом игрока
(function () {
  var wizardsParams = {
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

  var userCoat = document.querySelector('.setup-wizard .wizard-coat');
  var userCoatElement = document.querySelector('.setup-player input[name=coat-color]');
  var userEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var userEyesElement = document.querySelector('.setup-player input[name=eyes-color]');
  var userFireball = document.querySelector('.setup-fireball-wrap');
  var userFireballElement = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');

  var wizardPlayer = {
    coatColor: userCoat.style.fill,
    eyesColor: userEyes.style.fill,
    onCoatChange: function () {},
    onEyesChange: function () {}
  };

  // функция возвращает случайный индекс
  var getRandomIndex = function (max) {
    return Math.floor(Math.random() * max);
  };

  // функция изменения цвета плаща
  var onCoatClick = function () {
    var color = wizardsParams.COAT_COLORS[getRandomIndex(wizardsParams.COAT_COLORS.length)];
    userCoat.style.fill = color;
    userCoatElement.value = color;
    wizardPlayer.coatColor = color;
    wizardPlayer.onCoatChange(color);
  };

  // функция изменения цвета глаз
  var onEyesClick = function () {
    var color = wizardsParams.EYES_COLORS[getRandomIndex(wizardsParams.EYES_COLORS.length)];
    userEyes.style.fill = color;
    userEyesElement.value = color;
    wizardPlayer.eyesColor = color;
    wizardPlayer.onEyesChange(color);
  };

  // функция-обработчик нажатия на фаербол
  var onFireballClick = function () {
    var color = wizardsParams.FIREBALL_COLORS[getRandomIndex(wizardsParams.FIREBALL_COLORS.length)];
    userFireball.style.background = color;
    userFireballElement.value = color;
  };

  // обработчик клика по плащу
  userCoat.addEventListener('click', onCoatClick);

  // обработчик клика по глазам
  userEyes.addEventListener('click', onEyesClick);

  // обработчик клика по фаерболу
  userFireball.addEventListener('click', onFireballClick);

  // экспортируемый объект
  window.wizardPlayer = wizardPlayer;

})();
