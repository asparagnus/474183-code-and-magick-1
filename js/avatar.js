'use strict';

// загрузка аватара пользователя
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserElement = document.querySelector('[name=avatar]');
  var previewElement = document.querySelector('.setup-user-pic');
  var setupOpenElement = document.querySelector('.setup-open-icon');

  // функция-обработчик изменения состояния поля загрузки файлов
  var onInputFileChange = function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
        setupOpenElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  // обработчик изменения поля загрузки файлов
  fileChooserElement.addEventListener('change', onInputFileChange);

})();
