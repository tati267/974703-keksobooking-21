"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const pins = document.querySelector(`.map__pins`);
  const mainPin = pins.querySelector(`.map__pin--main`);

  window.elements = {
    map,
    pins,
    mainPin
  };
})();
