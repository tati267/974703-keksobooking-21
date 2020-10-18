"use strict";

(function () {
  // Заполняет шаблон для отрисовки пина
  const createPinAd = (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach((pinData) => {
      const pin = window.elements.pinTemplate.cloneNode(true);
      const img = pin.querySelector(`img`);

      pin.style = `left: ${pinData.location.x - img.width / 2}px;
                     top: ${pinData.location.y - img.height}px;`;
      img.src = pinData.author.avatar;
      img.alt = pinData.offer.title;
      fragment.append(pin);

      pin.addEventListener(`click`, () => {
        window.card.openCard(pinData);
      });
    });

    return fragment;
  };
  // Отрисовывает сгенерированные DOM-элементы в блок mapPins
  const pinAd = window.data.getPinAd();

  window.pin = {
    createPinAd,
    pinAd,
  };
})();
