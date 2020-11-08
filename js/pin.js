"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);
  const MAX_PIN_AMOUNT = 5;
  // Заполняет шаблон для отрисовки пинов
  const createPin = (data) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < MAX_PIN_AMOUNT; i++) {
      const pin = pinTemplate.cloneNode(true);
      const img = pin.querySelector(`img`);

      pin.style = `left: ${data[i].location.x - img.width / 2}px;
                     top: ${data[i].location.y - img.height}px;`;
      img.src = data[i].author.avatar;
      img.alt = data[i].offer.title;
      fragment.append(pin);

      pin.addEventListener(`click`, () => {
        window.card.open(data[i]);
      });
    }

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

  window.pin = {
    createPin,
    deletePins,
    mainPinSetInitial
  };
})();
