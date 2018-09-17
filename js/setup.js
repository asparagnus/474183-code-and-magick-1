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
var getRandomElement = function (min, max) {
  var randomI = Math.floor(min + Math.random() * (max + 1 - min));
  return randomI;
};

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

// EVENT
// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup Нажатие на элемент .setup-close, расположенный
// // внутри блока setup возвращает ему класс hidden.
// Полей с цветом плаща, глаз и фаерболла у нас нет, поэтому для них мы заведём скрытые (hidden) поля,
// которые будут отправляться вместе с формой, но видны пользователю не будут.
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var wizardForm = setup.querySelector('.setup-wizard-form');
var setupSubmit = setup.querySelector('.setup-submit');
var setupCoat = setup.querySelector('.wizard-coat');
var setupWizard = setup.querySelector('.setup-wizard');
var setupPlayerElements = document.querySelector('.setup-player').getElementsByTagName('input');
var setupEyes = setup.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var setupUserName = setup.querySelector('.setup-user-name');
var userNameInput = setup.querySelector('.setup-user-name');

// обработчик событий выдает сообщение на русском языке а не как в браузере
userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else { // сбросить значение поля, если это значение стало корректно.
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onSetupSubmitClick = function () {
  wizardForm.submit();
};

var onSetupSubmitPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    wizardForm.submit();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupSubmit.addEventListener('click', onSetupSubmitClick);
  setupSubmit.addEventListener('keydown', onSetupSubmitPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// внешний вид
setupCoat.addEventListener('click', function () {
  setupPlayerElements[0].value = COAT_COLORS[getRandomElement(0, COAT_COLORS.length - 1)];
  setupWizard.querySelector('.wizard-coat').style.fill = setupPlayerElements[0].value;
});

setupEyes.addEventListener('click', function () {
  setupPlayerElements[1].value = EYES_COLORS[getRandomElement(0, EYES_COLORS.length - 1)];
  setupWizard.querySelector('.wizard-eyes').style.fill = setupPlayerElements[1].value;
});

setupFireball.addEventListener('click', function () {
  setupPlayerElements[2].value = FIREBALL_COLORS[getRandomElement(0, FIREBALL_COLORS.length - 1)];
  setupFireball.style.background = setupPlayerElements[2].value;
});

setupUserName.addEventListener('change', function () {
  setupSubmit.disabled = !setupUserName.checkValidity();
});

// Подррбно
/*
// окно редактирования появляется
setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
  // Обработчик закрытия окна по ESC стоит добавлять только тогда, когда окно появляется на странице.
  document.addEventListener('keydown', function () {
    if (evt.keyCode === 27) {
      setup.classList.add('hidden');
    }
  });
});
// когда на элемент .setup-open можно поставить фокус с клавиатуры, сделаем так,
// чтобы нажатие на Enter на этом элементе открывало попап. Для этого нужно добавить еще один обработчик события.
setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    setup.classList.remove('hidden');
  }
});

// окно редактирования закрывается
setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});

// закрывается
setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    setup.classList.add('hidden');
  }
});


*/

