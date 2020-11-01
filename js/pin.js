"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);

  // Заполняет шаблон для отрисовки пинов

  const createPin = (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach((pinData) => {
      const pin = pinTemplate.cloneNode(true);
      const img = pin.querySelector(`img`);

      pin.style = `left: ${pinData.location.x - img.width / 2}px;
                     top: ${pinData.location.y - img.height}px;`;
      img.src = pinData.author.avatar;
      img.alt = pinData.offer.title;
      fragment.append(pin);

      pin.addEventListener(`click`, () => {
        window.card.open(pinData);
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

  window.pin = {
    createPin,
    deletePins,
    mainPinSetInitial
  };
})();
