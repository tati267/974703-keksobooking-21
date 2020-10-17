"use strict";

(function () {

  // Валидация заголовка

  window.elements.headingFormInput.addEventListener(`input`, () => {
    const valueLength = window.elements.headingFormInput.value.length;
    if (valueLength < window.util.HEADING_MIN_LENGTH) {
      window.elements.headingFormInput.setCustomValidity(`Еще ` + (window.util.HEADING_MIN_LENGTH - valueLength) + ` симв`);
    } else if (valueLength > window.util.HEADING_MAX_LENGTH) {
      window.elements.headingFormInput.setCustomValidity(`Удалите лишние ` + (valueLength - window.util.HEADING_MAX_LENGTH) + ` симв`);
    } else {
      window.elements.headingFormInput.setCustomValidity(``);
    }

    window.elements.headingFormInput.reportValidity();
  });

  // Валидация цены
  const typeHouse = (type) => {
    window.elements.priceInput.setAttribute(`minvalue`, window.util.offerTypes[type].min);
    window.elements.priceInput.setAttribute(`placeholder`, window.util.offerTypes[type].min);
  };
  window.elements.typeHouseSelect.addEventListener(`change`, (evt) => {
    typeHouse(evt.target.value);
  }
  );

  const customPriceValidation = function (cost) {
    window.elements.priceInput.setCustomValidity(`Минимальная стоимость этого жилья равна ${cost}`);
  };
  window.elements.priceInput.addEventListener(`input`, function () {
    const typeHousingValue = window.elements.typeHouseSelect.value;
    const priceValue = window.elements.priceInput.value.input;
    const minValue = window.util.offerTypes[typeHousingValue].min;

    window.elements.priceInput.min = minValue;
    if (priceValue < minValue) {
      customPriceValidation(minValue);
    }
    window.elements.priceInput.reportValidity();
  });

  // Валидация въезда и выезда

  const onTimeInChange = () => {
    window.elements.timeOut.value = window.elements.timeIn.value;
  };
  const onTimeOutChange = () => {
    window.elements.timeIn.value = window.elements.timeOut.value;
  };

  window.elements.timeIn.addEventListener(`change`, onTimeInChange);
  window.elements.timeOut.addEventListener(`change`, onTimeOutChange);

  // Соответствие количества комнат количеству мест
  const checkRoom = (people) => {
    window.elements.capacityOptions.forEach((element) => {
      element.disabled = true;
    });

    window.util.roomValues[people].forEach((seats) => {
      window.elements.capacityOptions.forEach((element) => {
        if (Number(element.value) === seats) {
          element.disabled = false;
          element.selected = true;
        }
      });
    });
  };

  window.elements.roomsSelect.addEventListener(`change`, (evt) => {
    checkRoom(evt.target.value);
  });

  // Функция для интерактивных элементов в неактивном состоянии

  const makePageDisabled = () => {
    window.elements.map.classList.add(`map--faded`);
    window.elements.adForm.classList.add(`ad-form--disabled`);
    window.elements.mapFilters.classList.add(`map__filters--disabled`);

    window.elements.fieldsets.forEach((fieldset) => {
      fieldset.setAttribute(`disabled`, ``);
    });
    addMainPinListener();
    setAddressInput(true);
  };
  // Функция для интерактивных элементов в активном состоянии

  const makePageActive = () => {
    window.elements.map.classList.remove(`map--faded`);
    window.elements.adForm.classList.remove(`ad-form--disabled`);
    window.elements.mapFilters.classList.remove(`map__filters--disabled`);
    window.elements.mapPins.append(window.pin.createPinAd(window.pin.pinAd));
    window.data.createCard(window.data.makePost[0]);
    window.elements.fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute(`disabled`, ``);
    });
    removeMainPinListener();
    setAddressInput();
  };

  /* Функция которая описывает взаимодействие с меткой и переводит страницу
в активный режим и приводит к заполнению поля адреса */
  const addMainPinListener = () => {
    window.elements.mainPin.addEventListener(`mousedown`, onMainPinMousedown);
    window.elements.mainPin.addEventListener(`keydown`, onMainPinEnterPressed);
  };

  const removeMainPinListener = () => {
    window.elements.mainPin.removeEventListener(`mousedown`, onMainPinMousedown);
    window.elements.mainPin.removeEventListener(`keydown`, onMainPinEnterPressed);
  };

  const onMainPinMousedown = (evt) => {
    if (evt.button === window.util.MOUSEDOWN) {
      makePageActive();
    }
  };

  const onMainPinEnterPressed = (evt) => {
    if (evt.key === window.util.ENTER) {
      makePageActive();
    }
  };
  // Функция вызова метода, который устанавливает значения поля ввода адреса/ координаты pointer
  const getMainPinCoordinates = (isDisabled) => {
    const PIN_WIDTH = 62;
    const PIN_HEIGHT = 62;
    const PIN_HEIGHT_ACTIVE = 84;
    const offsetX = PIN_WIDTH / 2;
    const offsetY = isDisabled ? PIN_HEIGHT / 2 : PIN_HEIGHT_ACTIVE;
    const pinLocationX = window.elements.mainPin.offsetLeft + offsetX;
    const pinLocationY = window.elements.mainPin.offsetTop + offsetY;

    return [pinLocationX, pinLocationY];
  };

  const setAddressInput = (isDisabled) => {
    const [x, y] = getMainPinCoordinates(isDisabled);
    window.elements.addressInput.value = `${x}, ${y}`;
  };
  makePageDisabled();

  window.form = {
    makePageActive,
    makePageDisabled
  };
})();
