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
  const ENTER = `Enter`;
  const MOUSEDOWN = 0;
  const HEADING_MIN_LENGTH = 30;
  const HEADING_MAX_LENGTH = 100;

  const roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  // Валидация заголовка

  headingFormInput.addEventListener(`input`, () => {
    const valueLength = headingFormInput.value.length;
    if (valueLength < HEADING_MIN_LENGTH) {
      headingFormInput.setCustomValidity(`Еще ${HEADING_MIN_LENGTH - valueLength} симв`);
    } else if (valueLength > HEADING_MAX_LENGTH) {
      headingFormInput.setCustomValidity(`Удалите лишние ${valueLength - HEADING_MAX_LENGTH} симв`);
    } else {
      headingFormInput.setCustomValidity(``);
    }

    headingFormInput.reportValidity();
  });

  // Валидация цены

  const typeHouse = (type) => {
    priceInput.setAttribute(`minvalue`, window.util.offerTypes[type].min);
    priceInput.setAttribute(`placeholder`, window.util.offerTypes[type].min);
  };
  typeHouseSelect.addEventListener(`change`, (evt) => {
    typeHouse(evt.target.value);
  }
  );

  const customPriceValidation = function (cost) {
    priceInput.setCustomValidity(`Минимальная стоимость этого жилья равна ${cost}`);
  };
  priceInput.addEventListener(`input`, function () {
    const typeHousingValue = typeHouseSelect.value;
    const priceValue = priceInput.value.input;
    const minValue = window.util.offerTypes[typeHousingValue].min;

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

    roomValues[people].forEach((seats) => {
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
    window.pin.mainPinSetInitial();
    setaddress(true);
  };

  // Функция для интерактивных элементов в активном состоянии

  const makePageActive = () => {
    window.util.map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    filters.classList.remove(`map__filters--disabled`);
    window.backend.load(window.pin.createPin, window.message.error);
    fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute(`disabled`, ``);
    });
    removeMainPinListener();
    window.pin.mainPinSetInitial();
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
    if (evt.button === MOUSEDOWN) {
      makePageActive();
    }
  };

  const onMainPinEnterPressed = (evt) => {
    if (evt.key === ENTER) {
      makePageActive();
    }
  };

  // Функция вызова метода, который устанавливает значения поля ввода адреса/ координаты pointer

  const getMainPinCoordinates = (isDisabled) => {
    const offsetX = window.util.MAIN_PIN.width / 2;
    const offsetY = isDisabled ? window.util.MAIN_PIN.height / 2 : window.util.MAIN_PIN.heightActive;
    const pinLocationX = window.util.mainPin.offsetLeft + offsetX;
    const pinLocationY = window.util.mainPin.offsetTop + offsetY;

    return [pinLocationX, pinLocationY];
  };

  const setaddress = (isDisabled) => {
    const [x, y] = getMainPinCoordinates(isDisabled);
    address.value = `${x}, ${y}`;
  };
  makePageDisabled();
  // отменим действие формы по умолчанию.
  // Диалог закроется, как только данные будут успешно сохранены.

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.message.successHandler, window.message.errorHandler);
    form.reset();
    window.pin.deletePins();
    window.card.close();
    makePageDisabled();
  });

  window.form = {
    form,
    setaddress,
    makePageDisabled
  };
})();
