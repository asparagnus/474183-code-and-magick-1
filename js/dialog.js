'use strict';

// описывает взаимодействие с окном диалога
(function () {

  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userNameElement = userDialog.querySelector('.setup-user-name');

  var uploadElement = userDialog.querySelector('.upload');
  var formElement = userDialog.querySelector('.setup-wizard-form');

  var PositionUserDialog = {
    x: userDialog.style.left,
    y: userDialog.style.top
  };

  // функция-обработчик нажатия на Esc
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  // функция открывает окно персонажа
  var openPopup = function () {
    userDialog.style.left = PositionUserDialog.x;
    userDialog.style.top = PositionUserDialog.y;
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // функция закрывает окно персонажа
  var closePopup = function () {
    userDialog.classList.add('hidden');
  };

  // если поле имени в фокусе, удаляем обработчик нажатия Esc
  userNameElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  // если поле имени не в фокусе, добавляем обработчик нажатия Esc
  userNameElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  // обработчик клика на блоке открытия окна
  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  // обработчик нажатия на клавишу на блоке открытия окна
  userDialogOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  // обработчик клика на кнопке закрыть
  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  // обработчик нажатия на клавишу на кнопке закрыть
  userDialogClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  // функция-обработчик захвата изображения пользователя
  var onUserPicMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onUserPicMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onUserPicMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onUserPicMouseMove);
      document.removeEventListener('mouseup', onUserPicMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          uploadElement.removeEventListener('click', onClickPreventDefault);
        };
        uploadElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onUserPicMouseMove);
    document.addEventListener('mouseup', onUserPicMouseUp);
  };

  // функция-коллбэк скрывает диалог
  var onCloseDialog = function () {
    userDialog.classList.add('hidden');
  };

  // функция-обработчик отправки формы
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), onCloseDialog, window.utils.onError);
  };

  // обработчик отправки данных формы
  formElement.addEventListener('submit', onFormSubmit);

  // обработчик нажатия на uploadElement
  uploadElement.addEventListener('mousedown', onUserPicMouseDown);

})();
