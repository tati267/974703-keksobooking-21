"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);
  // Заполняет шаблон для отрисовки пинов
  const createPin = (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      const pin = pinTemplate.cloneNode(true);
      const img = pin.querySelector(`img`);

      pin.style = `left: ${item.location.x - img.width / 2}px;
                   top: ${item.location.y - img.height}px;`;
      img.src = item.author.avatar;
      img.alt = item.offer.title;
      fragment.append(pin);

      pin.addEventListener(`click`, () => {
        window.card.open(item);
      });
    });

    window.util.pins.appendChild(fragment);
  };

  const deletePins = () => {
    const pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((pin) => {
      pin.remove();
    });
  };

  const mainPinSetInitial = () => {
    window.util.mainPin.style.top = window.util.MAIN_PIN.initialTop + `px`;
    window.util.mainPin.style.left = window.util.MAIN_PIN.initialLeft + `px`;
  };

  /* Функция которая описывает взаимодействие с меткой и переводит страницу
  в активный режим и приводит к заполнению поля адреса */

  const addMainPinListener = () => {
    window.util.mainPin.addEventListener(`mousedown`, onMainPinMousedown);
    window.util.mainPin.addEventListener(`keydown`, onMainPinEnterPressed);
  };

  const removeMainPinListener = () => {
    window.util.mainPin.removeEventListener(`mousedown`, onMainPinMousedown);
    window.util.mainPin.removeEventListener(`keydown`, onMainPinEnterPressed);
  };

  const onMainPinMousedown = (evt) => {
    if (evt.button === 0) {
      window.form.makePageActive();
    }
  };

  const onMainPinEnterPressed = (evt) => {
    if (evt.key === `Enter`) {
      window.form.makePageActive();
    }
  };

  window.pin = {
    createPin,
    deletePins,
    mainPinSetInitial,
    addMainPinListener,
    removeMainPinListener,

  };
})();
