'use strict';
// module3-task1
const mapPins = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const POSTS_NUMBER = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKTIME = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_PRICE = 1000;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_LOCATION_X = 0;
const MAX_LOCATION_X = map.clientWidth;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

// случайное число в указаном диапазоне
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// случайное значение из массива
const getRandomArrayElement = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};
// Возвращает новый массив случайной длины
const getRandomArr = (arr) => arr.slice(getRandomInteger(0, arr.length));

// Функция которая возвращает объекты
const makePost = [];
const getPinAd = () => {
  // Цикл который добавляет объекты
  for (let i = 0; i < POSTS_NUMBER; i++) {
    makePost.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `Заголовок предложения`,
        address: `x, y`,
        price: getRandomInteger(MIN_PRICE, MAX_PRICE),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomArrayElement(CHECKTIME),
        checkout: getRandomArrayElement(CHECKTIME),
        features: getRandomArr(FEATURES),
        description: `строка с описанием`,
        photos: getRandomArrayElement(PHOTOS)
      },
      location: {
        x: getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X),
        y: getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y),
      }
    });
  }
  return makePost;
};
getPinAd();
// Заполняет шаблон для отрисовки пина
const createPinAd = (data) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const pin = pinTemplate.cloneNode(true);
    const img = pin.querySelector(`img`);

    pin.style = `left: ${item.location.x - img.width / 2}px;
                     top: ${item.location.y - img.height}px;`;
    img.src = item.author.avatar;
    img.alt = item.offer.title;
    fragment.append(pin);
  });

  return fragment;
};

// Отрисовывает сгенерированные DOM-элементы в блок mapPins
const pinAd = getPinAd();
mapPins.append(createPinAd(pinAd));
const mapFilters = map.querySelector(`.map__filters-container`);

const createCard = (obj) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardItem = cardTemplate.cloneNode(true);
  const roomNum = obj.offer.rooms;
  const guestNum = obj.offer.guests;
  const guestPhrase = ` гостей `;
  const roomPhrase = ` комнаты `;
  map.insertBefore(cardItem, mapPins);

  cardItem.querySelector(`.popup__title`).textContent = obj.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = obj.offer.address;
  cardItem.querySelector(`.popup__text--price`).innerHTML = `${obj.offer.price} &#x20bd/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = obj.offer.type;
  cardItem.querySelector(`.popup__text--capacity`).textContent = `${roomNum}${roomPhrase} для ${guestNum}${guestPhrase}`;
  cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin} выезд после ${obj.offer.checkout}`;
  cardItem.querySelector(`.popup__description`).textContent = obj.offer.description;
  cardItem.querySelector(`.popup__avatar`).src = obj.author.avatar;

  mapFilters.insertBefore(cardItem, null);
};

createCard(makePost[0]);
