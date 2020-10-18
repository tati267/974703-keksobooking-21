"use strict";

(function () {
  // обработаем событие клика на mainPin
  window.elements.mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    // Запомним координаты точки, с которой мы начали перемещать диалог
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + `px`;
      setup.style.left = (setup.offsetLeft - shift.x) + `px`;
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
