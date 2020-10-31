"use strict";

(function () {
  const ESC = `Escape`;

  const error = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  // Удалить окно из разметки
  const removeMessage = () => {
    document.querySelector(`main`).removeChild(document.querySelector(`main`).lastChild);
  };

  // Коллбэк функция, если возникла ошибка в отправке данных
  const errorHandler = (message) => {
    // Найти template Error и отобразить его, повесить обработчик на закрытие
    const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorPopup = templateError.cloneNode(true);
    const errorButton = errorPopup.querySelector(`.error__button`);
    errorPopup.querySelector(`p`).textContent = message;
    document.querySelector(`main`).appendChild(errorPopup);
    errorPopup.setAttribute(`tabindex`, `0`);
    errorPopup.focus();

    // Обработчики закрытия окна

    errorPopup.addEventListener(`keydown`, (evt) => {
      if (evt.key === ESC) {
        removeMessage();
      }
    });

    errorPopup.addEventListener(`click`, () => {
      removeMessage();
    });

    errorButton.addEventListener(`click`, () => {
      removeMessage();
    });
  };

  const successHandler = () => {
    // Найти template Success и отобразить его, повесить обработчик на закрытие
    const templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
    const successPopup = templateSuccess.cloneNode(true);
    document.querySelector(`main`).appendChild(successPopup);
    successPopup.setAttribute(`tabindex`, `0`);
    successPopup.focus();

    // Обработчики закрытия окна

    successPopup.addEventListener(`keydown`, (evt) => {
      if (evt.key === ESC) {
        removeMessage();
      }
    });

    successPopup.addEventListener(`click`, () => {
      removeMessage();
    });
  };

  window.message = {
    error,
    errorHandler,
    successHandler
  };
})();
