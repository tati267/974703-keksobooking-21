"use strict";

const map = document.querySelector(`.map`);
const pins = document.querySelector(`.map__pins`);
const mainPin = pins.querySelector(`.map__pin--main`);

const offerTypes = {
  palace: {
    name: `Дворец`,
    min: 10000
  },
  flat: {
    name: `Квартира`,
    min: 1000
  },
  house: {
    name: `Дом`,
    min: 5000
  },
  bungalow: {
    name: `Бунгало`,
    min: 0
  }
};

const MAIN_PIN = {
  width: 62,
  height: 62,
  heightActive: 84,
  initialTop: 375,
  initialLeft: 570,
  minX: 0,
  maxX: 1200,
  minY: 130,
  maxY: 630
};

const addIdToOffer = (array) => {
  array.forEach((value, index) => {
    value.offer.offerId = index;

    return value.offer.offerId;
  });

  return array;
};

window.util = {
  map,
  pins,
  mainPin,
  offerTypes,
  MAIN_PIN,
  addIdToOffer
};
