"use strict";

(function () {
  const filters = document.querySelector(`.map__filters`);
  const form = document.querySelector(`.ad-form`);
  const headingFormInput = form.querySelector(`#title`);
  const address = form.querySelector(`#address`);
  const typeHouseSelect = form.querySelector(`#type`);
  const roomsSelect = form.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  const capacityOptions = capacity.querySelectorAll(`option`);
  const priceInput = form.querySelector(`#price`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);

  // Валидация заголовка

  headingFormInput.addEventListener(`input`, () => {
    const valueLength = headingFormInput.value.length;
    if (valueLength < window.util.HEADING_MIN_LENGTH) {
      headingFormInput.setCustomValidity(`Еще ` + (window.util.HEADING_MIN_LENGTH - valueLength) + ` симв`);
    } else if (valueLength > window.util.HEADING_MAX_LENGTH) {
      headingFormInput.setCustomValidity(`Удалите лишние ` + (valueLength - window.util.HEADING_MAX_LENGTH) + ` симв`);
    } else {
      headingFormInput.setCustomValidity(``);
    }

    headingFormInput.reportValidity();
  });

  // Валидация цены
  const typeHouse = (type) => {
    priceInput.setAttribute(`minvalue`, window.card.offerTypes[type].min);
    priceInput.setAttribute(`placeholder`, window.card.offerTypes[type].min);
  };
  typeHouseSelect.addEventListener(`change`, (evt) => {
    typeHouse(evt.target.value);
  }
  );

  const customPriceValidation = function (cost) {
    priceInput.setCustomValidity(`Минимальная стоимость этого жилья равна ${cost}`);
  };
  priceInput.addEventListener(`input`, function () {
    const typeHousingValue = window.elements.typeHouseSelect.value;
    const priceValue = priceInput.value.input;
    const minValue = window.card.offerTypes[typeHousingValue].min;

    priceInput.min = minValue;
    if (priceValue < minValue) {
      customPriceValidation(minValue);
    }
    priceInput.reportValidity();
  });

  // Валидация въезда и выезда

  const onTimeInChange = () => {
    timeOut.value = timeIn.value;
  };
  const onTimeOutChange = () => {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener(`change`, onTimeInChange);
  timeOut.addEventListener(`change`, onTimeOutChange);

  // Соответствие количества комнат количеству мест
  const checkRoom = (people) => {
    capacityOptions.forEach((element) => {
      element.disabled = true;
    });

    window.util.roomValues[people].forEach((seats) => {
      capacityOptions.forEach((element) => {
        if (Number(element.value) === seats) {
          element.disabled = false;
          element.selected = true;
        }
      });
    });
  };

  roomsSelect.addEventListener(`change`, (evt) => {
    checkRoom(evt.target.value);
  });

  // Функция для интерактивных элементов в неактивном состоянии

  const makePageDisabled = () => {
    window.util.map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    filters.classList.add(`map__filters--disabled`);

    fieldsets.forEach((fieldset) => {
      fieldset.setAttribute(`disabled`, ``);
    });
    addMainPinListener();
    setaddress(true);
  };

  // Функция для интерактивных элементов в активном состоянии

  const makePageActive = () => {
    window.util.map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    filters.classList.remove(`map__filters--disabled`);
    window.backend.load(window.pin.createPin, window.error.message);
    fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute(`disabled`, ``);
    });
    removeMainPinListener();
    setaddress();
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
    const pinLocationX = window.util.mainPin.offsetLeft + offsetX;
    const pinLocationY = window.util.mainPin.offsetTop + offsetY;

    return [pinLocationX, pinLocationY];
  };

  const setaddress = (isDisabled) => {
    const [x, y] = getMainPinCoordinates(isDisabled);
    address.value = `${x}, ${y}`;
  };
  makePageDisabled();

  window.form = {
    makePageActive,
    makePageDisabled,
    setaddress
  };
})();
