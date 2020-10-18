"use strict";

(function () {
  const POSTS_NUMBER = 8;
  const TYPES_EN = [`palace`, `flat`, `house`, `bungalow`];
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

  const roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  const CHECKTIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const MIN_PRICE = 1000;
  const MAX_PRICE = 1000000;
  const MIN_ROOMS = 1;
  const MAX_ROOMS = 5;
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 10;
  const MIN_LOCATION_X = 0;
  const MAX_LOCATION_X = 1200;
  const MIN_LOCATION_Y = 130;
  const MAX_LOCATION_Y = 630;

  const ENTER = `Enter`;
  const MOUSEDOWN = 0;
  const HEADING_MIN_LENGTH = 30;
  const HEADING_MAX_LENGTH = 100;

  const isEscEvent = (evt, callback) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      callback();
    }
  };

  // случайное число в указаном диапазоне
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  // случайное значение из массива
  const getRandomArrayElement = (arr) => {
    return arr[getRandomInteger(0, arr.length - 1)];
  };
  // Возвращает новый массив случайной длины
  const getRandomArray = (arr) => arr.slice(getRandomInteger(0, arr.length));

  window.util = {
    POSTS_NUMBER,
    TYPES_EN,
    offerTypes,
    roomValues,
    CHECKTIMES,
    FEATURES,
    PHOTOS,
    MIN_PRICE,
    MAX_PRICE,
    MIN_ROOMS,
    MAX_ROOMS,
    MIN_GUESTS,
    MAX_GUESTS,
    MIN_LOCATION_X,
    MAX_LOCATION_X,
    MIN_LOCATION_Y,
    MAX_LOCATION_Y,
    ENTER,
    MOUSEDOWN,
    HEADING_MIN_LENGTH,
    HEADING_MAX_LENGTH,
    isEscEvent,
    getRandomInteger,
    getRandomArrayElement,
    getRandomArray
  };
})();
