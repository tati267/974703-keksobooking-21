"use strict";

(function () {
  const ESC = `Escape`;

  // Коллбэк функция, если возникла ошибка в отправке данных
  const message = (error) => {
  // Найти template Error и отобразить его, повесить обработчик на закрытие
    const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorPopup = templateError.cloneNode(true);
    const errorButton = errorPopup.querySelector(`.error__button`);
    errorPopup.querySelector(`p`).textContent = error;
    document.querySelector(`main`).appendChild(errorPopup);
    errorPopup.setAttribute(`tabindex`, `0`);
    errorPopup.focus();

    // Удалить окно из разметки
    const removeError = () => {
      document.querySelector(`main`).removeChild(document.querySelector(`main`).lastChild);
    };
    // Обработчики закрытия окна

    errorPopup.addEventListener(`keydown`, (evt) => {
      if (evt.key === ESC) {
        removeError();
      }
    });

    errorPopup.addEventListener(`click`, () => {
      removeError();
    });

    errorButton.addEventListener(`click`, () => {
      removeError();
    });
  };

  window.error = {
    message
  };
})();
