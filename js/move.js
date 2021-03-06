"use strict";

(function () {

  // перемещение mainPin module5-task2
  window.util.mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const movePin = () => {
        let top = window.util.mainPin.offsetTop - shift.y;
        let left = window.util.mainPin.offsetLeft - shift.x;
        if (
          left >= window.util.MAIN_PIN.minX - window.util.MAIN_PIN.width / 2 &&
          left <= window.util.MAIN_PIN.maxX - window.util.MAIN_PIN.width / 2 &&
          top >= window.util.MAIN_PIN.minY - window.util.MAIN_PIN.heightActive &&
          top <= window.util.MAIN_PIN.maxY - window.util.MAIN_PIN.heightActive
        ) {
          window.util.mainPin.style.top = top + `px`;
          window.util.mainPin.style.left = left + `px`;

          window.form.setaddress();
        }
      };
      movePin();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.util.mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        window.util.mainPin.addEventListener(`click`, onClickPreventDefault);
      }
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
