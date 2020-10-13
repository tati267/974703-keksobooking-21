'use strict';
// module3-task1
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const mainPin = mapPins.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const addressInput = adForm.querySelector(`#address`);
const typeHouseSelect = adForm.querySelector(`#type`);
const roomsSelect = adForm.querySelector(`#room_number`);
const capacity = document.querySelector(`#capacity`);
const capacityOptions = capacity.querySelectorAll(`option`);
const headingFormInput = adForm.querySelector(`#title`);
const priceInput = adForm.querySelector(`#price`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const fieldsets = document.querySelectorAll(`fieldset`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);

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
const MAX_LOCATION_X = map.clientWidth;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;

const ENTER = `Enter`;
const MOUSEDOWN = 0;
const HEADING_MIN_LENGTH = 30;
const HEADING_MAX_LENGTH = 100;

// случайное число в указаном диапазоне
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// случайное значение из массива
const getRandomArrayElement = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};

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
        type: getRandomArrayElement(TYPES_EN),
        rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomArrayElement(CHECKTIMES),
        checkout: getRandomArrayElement(CHECKTIMES),
        features: FEATURES,
        description: `строка с описанием`,
        photos: PHOTOS
      },
      location: {
        x: getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X),
        y: getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y),
      }
    });
  }
  return makePost;
};
// Заполняет шаблон для отрисовки пина
const createPinAd = (data) => {
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

// module3-task2
// Отрисовывает сгенерированные DOM-элементы в блок mapPins
const pinAd = getPinAd();

// Функция для отрисовки features
const renderFeatures = (obj, templateCopy) => {
  const cardFeatures = templateCopy.querySelector(`.popup__features`);
  cardFeatures.innerHTML = ``;

  for (let i = 0; i < obj.offer.features.length; i++) {
    let li = document.createElement(`li`);
    li.classList.add(`popup__feature`, `popup__feature--${obj.offer.features[i]}`);
    cardFeatures.appendChild(li);
  }
};

// Функция для отрисовки photo
const renderPhotos = (obj, templateCopy) => {
  const cardPhotos = templateCopy.querySelector(`.popup__photos`);
  const cardPhoto = cardPhotos.querySelector(`.popup__photo`);
  cardPhoto.src = `${obj.offer.photos[0]}`;

  for (let i = 1; i < obj.offer.photos.length; i++) {
    let cardPhotoCopy = cardPhoto.cloneNode();
    cardPhotoCopy.src = `${obj.offer.photos[i]}`;

    cardPhotos.appendChild(cardPhotoCopy);
  }
};

// Функция для отрисовки объявления
const createCard = (obj) => {
  const cardItem = cardTemplate.cloneNode(true);
  const roomNum = obj.offer.rooms;
  const guestNum = obj.offer.guests;
  const guestPhrase = ` гостей `;
  const roomPhrase = ` комнаты `;
  map.insertBefore(cardItem, mapPins);

  cardItem.querySelector(`.popup__title`).textContent = obj.offer.title;
  cardItem.querySelector(`.popup__text--address`).textContent = obj.offer.address;
  cardItem.querySelector(`.popup__text--price`).innerHTML = `${obj.offer.price} &#x20bd/ночь`;
  cardItem.querySelector(`.popup__type`).textContent = offerTypes[obj.offer.type].name;
  cardItem.querySelector(`.popup__text--capacity`).textContent = `${roomNum}${roomPhrase} для ${guestNum}${guestPhrase}`;
  cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin}, выезд после ${obj.offer.checkout}`;
  renderFeatures(obj, cardItem);
  cardItem.querySelector(`.popup__description`).textContent = obj.offer.description;
  renderPhotos(obj, cardItem);
  cardItem.querySelector(`.popup__avatar`).src = obj.author.avatar;
  mapFilters.insertBefore(cardItem, null);

  if (document.querySelector(`.popup__close`)) {
    document.querySelector(`.popup__close`).addEventListener(`click`, function () {
      document.querySelector(`.map__card`).remove();
    });
  }

  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  map.insertBefore(cardItem, mapFilterContainer);
  return cardItem;
};

// module4-task1

// Функция вызова метода, который устанавливает значения поля ввода адреса/ координаты pointer

const getMainPinCoordinates = () => {
  const offsetX = 31;
  const offsetY = 84;
  let pinLocationX = mainPin.offsetLeft + offsetX;
  let pinLocationY = mainPin.offsetTop + offsetY;

  return [pinLocationX, pinLocationY];
};

const setAddressInput = () => {
  const [x, y] = getMainPinCoordinates();
  addressInput.value = `${x}, ${y}`;
};

/* Функция которая описывает взаимодействие с меткой и переводит страницу
в активный режим и приводит к заполнению поля адреса */

const addMainPinListener = () => {
  mainPin.addEventListener(`mousedown`, onMainPinMousedown);
  mainPin.addEventListener(`keydown`, onMainPinEnterPressed);
};

const removeMainPinListener = () => {
  mainPin.removeEventListener(`mousedown`, onMainPinMousedown);
  mainPin.removeEventListener(`keydown`, onMainPinEnterPressed);
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

// Валидация заголовка
headingFormInput.addEventListener(`input`, () => {
  const valueLength = headingFormInput.value.length;
  if (valueLength < HEADING_MIN_LENGTH) {
    headingFormInput.setCustomValidity(`Еще ` + (HEADING_MIN_LENGTH - valueLength) + ` симв`);
  } else if (valueLength > HEADING_MAX_LENGTH) {
    headingFormInput.setCustomValidity(`Удалите лишние ` + (valueLength - HEADING_MAX_LENGTH) + ` симв`);
  } else {
    headingFormInput.setCustomValidity(``);
  }

  headingFormInput.reportValidity();
});

// Валидация цены

const typeHouse = (type) => {
  priceInput.setAttribute(`minvalue`, offerTypes[type].min);
  priceInput.setAttribute(`placeholder`, offerTypes[type].min);
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
  const minValue = offerTypes[typeHousingValue].min;

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

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
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
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  mapFilters.classList.add(`map__filters--disabled`);

  fieldsets.forEach((fieldset) => {
    fieldset.setAttribute(`disabled`, ``);
  });
  addMainPinListener();
  setAddressInput();
};

makePageDisabled();

// Функция для интерактивных элементов в активном состоянии

const makePageActive = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  mapFilters.classList.remove(`map__filters--disabled`);
  mapPins.append(createPinAd(pinAd));
  createCard(makePost[0]);
  fieldsets.forEach((fieldset) => {
    fieldset.removeAttribute(`disabled`, ``);
  });
  removeMainPinListener();
};

