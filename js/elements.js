"use strict";

(function () {
  const map = document.querySelector(`.map`);
  const pins = document.querySelector(`.map__pins`);
  const mainPin = pins.querySelector(`.map__pin--main`);
  const filters = document.querySelector(`.map__filters`);
  const form = document.querySelector(`.ad-form`);
  const headingFormInput = form.querySelector(`#title`);
  const address = form.querySelector(`#address`);
  const typeHouseSelect = form.querySelector(`#type`);
  const roomsSelect = form.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  const capacityOptions = capacity.querySelectorAll(`option`);
  const priceInput = form.querySelector(`#price`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const timeIn = document.querySelector(`#timein`);
  const timeOut = document.querySelector(`#timeout`);
  const mapFilterContainer = document.querySelector(`.map__filters-container`);

  window.elements = {
    map,
    pins,
    mainPin,
    filters,
    form,
    headingFormInput,
    address,
    typeHouseSelect,
    roomsSelect,
    capacityOptions,
    priceInput,
    cardTemplate,
    fieldsets,
    pinTemplate,
    timeIn,
    timeOut,
    mapFilterContainer
  };
})();
