'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var WIZARD_SURNAME = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var n = 4;

// открыть панель
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// случайный элемент из массива
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var wizards = []; // все сгенерированные волшебники

// шаблон новый волшебник
for (var i = 0; i < WIZARD_NAMES.length; i++) {
  var newWizard = {
    name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAME),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS),
  };
  wizards.push(newWizard);
}

// создает данные новых волшебников записывает имя курточку и цвет глаз в соответствующие классы
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// добавляем новый фрагмент
var similarListElement = userDialog.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
for (var j = 0; j < n; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
