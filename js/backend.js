'use strict';
(function () {

  const load = (onLoad, onError) => {
    const TIMEOUT_IN_MS = 10000;
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
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
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };

  const save = (data, onLoad, onError) => {
    const URL = `https://21.javascript.pages.academy/keksobooking`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
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
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };
})();
