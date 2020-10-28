"use strict";

(function () {
  // Коллбэк функция, если возникла ошибка в отправке данных
  const message = function (error) {
  // Найти template Error и отобразить его, повесить обработчик на закрытие
    const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorPopup = templateError.cloneNode(true);
    errorPopup.querySelector(`p`).textContent = error;
    document.querySelector(`main`).appendChild(errorPopup);
    errorPopup.setAttribute(`tabindex`, `0`);
    errorPopup.focus();

    // Обработчики закрытия окна

    errorPopup.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
      // Удалить окно из разметки
        document.querySelector(`main`).removeChild(document.querySelector(`main`).lastChild);
      }
    });

    errorPopup.addEventListener(`click`, function () {
    // Удалить окно из разметки
      document.querySelector(`main`).removeChild(document.querySelector(`main`).lastChild);
    });

    errorPopup.querySelector(`.error__button`).addEventListener(`click`, function () {
    // Удалить окно из разметки
      document.querySelector(`main`).removeChild(document.querySelector(`main`).lastChild);
    });
  };

  window.error = {
    message
  };
})();
