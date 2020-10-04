'use strict';
// module3-task1
const POSTS_NUMBER = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKTIME = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const PINS_AREA = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

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
const getPinAd = () => {
  const makePost = [];
  // Цикл который добавляет объекты
  for (let i = 0; i < POSTS_NUMBER; i++) {
    makePost.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `Заголовок предложения`,
        address: `x, y`,
        price: getRandomInteger(1000, 1000000),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: getRandomArrayElement(CHECKTIME),
        checkout: getRandomArrayElement(CHECKTIME),
        features: getRandomArr(FEATURES),
        description: `строка с описанием`,
        photos: getRandomArrayElement(PHOTOS)
      },
      location: {
        x: getRandomInteger(0, map.clientWidth),
        y: getRandomInteger(130, 630),
      }
    });
  }
  return makePost;
};

// Заполняет шаблон для отрисовки пина
const createPinAd = (data) => {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const pin = pinTemplate.cloneNode(true);
    const img = pin.querySelector(`img`);

    pin.style = `left: ${item.location.x - img.width / 2}px;
                     top: ${item.location.y - img.height}px;`;
    pin.querySelector(`img`).src = item.author.avatar;
    pin.querySelector(`img`).alt = item.offer.title;
    fragment.append(pin);
  });

  return fragment;
};

// Oтрисовывает пины в DOM
const pinAd = getPinAd();
PINS_AREA.append(createPinAd(pinAd));
