'use strict';
(function () {
  let data = [];
  const onError = window.message.errorHandler;
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    errorStatus(xhr, onError);
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = 10000;
  xhr.open(`GET`, URL);
  xhr.send();

  function errorStatus(xhr, onError) {
    let error = ` `;
    switch (xhr.status) {
      case 200:
        window.backend.data = xhr.response;
        break;
      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: : ${xhr.status} ${xhr.statusText}`;
    }

    if (error) {
      onError(error);
    }
  };

  function save(data, onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      errorStatus(xhr, onLoad, onError);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  }

  window.backend = {
    data,
    save
  };
})();
