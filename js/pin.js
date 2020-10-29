"use strict";

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // Заполняет шаблон для отрисовки пина
  
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

  window.pin = {
    createPin
  };
})();
