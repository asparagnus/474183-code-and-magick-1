'use strict';

// отрисовывает похожих магов
(function () {
  var COUNT = 4;
  var wizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarElement = document.querySelector('.setup-similar');

  // функция создания DOM-элементов и заполнения их данными из массива
  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplateElement.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // функция отрисовки полученных с сервера объектов
  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT; i++) {
      similarListElement.innerHTML = '';
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    similarElement.classList.remove('hidden');
  };

  // экспортируемый объект
  window.renderWizards = renderWizards;

})();
