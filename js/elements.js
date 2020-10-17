"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const mainPin = mapPins.querySelector(`.map__pin--main`);
  const mapFilters = document.querySelector(`.map__filters`);
  const adForm = document.querySelector(`.ad-form`);
  const headingFormInput = adForm.querySelector(`#title`);
  const addressInput = adForm.querySelector(`#address`);
  const typeHouseSelect = adForm.querySelector(`#type`);
  const roomsSelect = adForm.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  const capacityOptions = capacity.querySelectorAll(`option`);
  const priceInput = adForm.querySelector(`#price`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);

  window.elements = {
    map,
    mapPins,
    mainPin,
    mapFilters,
    adForm,
    headingFormInput,
    addressInput,
    typeHouseSelect,
    roomsSelect,
    capacityOptions,
    priceInput,
    cardTemplate,
    fieldsets,
    pinTemplate,
    timeIn,
    timeOut
  };
})();
