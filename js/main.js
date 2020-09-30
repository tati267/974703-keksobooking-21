'use strict';

const QUANTITY_POSTS = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKTIME = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

// случайное число в указаном диапазоне
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// случайное значение из массива
const getRandomArrayElement = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};

// Генерация списка автаров
const createAvatars = () => {
  const avatars = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    let avatar = `img/avatars/user0` + (i + 1) + `.png`;

    avatars[i] = avatar;
  }
  return avatars;
};

// Генерация списка Titles
const createTitles = () => {
  const titles = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    let title = `Заголовок предложения ` + (i + 1);

    titles[i] = title;
  }
  return titles;
};

// Генерация списка адрессов
const createAddresses = () => {
  const addresses = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    let x = getRandomInteger(100, 999);
    let y = getRandomInteger(100, 999);
    let address = x + `, ` + y;
    addresses[i] = address;
  }
  return addresses;
};

// Генерация списка цен
const createPrices = () => {
  const prices = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    let price = getRandomInteger(500, 5000);
    prices[i] = price;
  }
  return prices;
};

// Генерация кол-во комнат
const createRooms = () => {
  const rooms = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    let room = getRandomInteger(1, 20);
    rooms[i] = room;
  }
  return rooms;
};

// Генерация кол-во гостей
const createGuests = () => {
  const guests = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    let guest = getRandomInteger(0, 10);
    guests[i] = guest;
  }
  return guests;
};

// Генерация местоположения
const createLocations = () => {
  const locations = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    let location = {};
    location.x = getRandomInteger(0, 1200);
    location.y = getRandomInteger(130, 630);
    locations[i] = location;
  }
  return locations;
};

const avatars = createAvatars(QUANTITY_POSTS);
const titles = createTitles(QUANTITY_POSTS);
const addresses = createAddresses(QUANTITY_POSTS);
const prices = createPrices(QUANTITY_POSTS);
const rooms = createRooms(QUANTITY_POSTS);
const guests = createGuests(QUANTITY_POSTS);
const locations = createLocations(QUANTITY_POSTS);

// генерация списка предложений
const createPosts = () => {
  const posts = [];
  for (let i = 0; i < QUANTITY_POSTS; i++) {
    const post = {
      'author': {
        'avatar': avatars[i]
      },
      'offers': {
        'title': titles[i],
        'address': addresses[i],
        'price': prices[i],
        'type': getRandomArrayElement(TYPES),
        'rooms': rooms[i],
        'guests': guests[i],
        'checkin': getRandomArrayElement(CHECKTIME),
        'checkout': getRandomArrayElement(CHECKTIME),
        'features': getRandomArrayElement(FEATURES),
        'description': `строка с описанием`,
        'photos': getRandomArrayElement(PHOTOS)
      },
      'location': locations[i]
    };
    posts[i] = post;
  }
  return posts;
};

const posts = createPosts(QUANTITY_POSTS);
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

for (let i = 0; i < QUANTITY_POSTS; i++) {
  let pin = pinTemplate.cloneNode(true);

  pin.style.left = (posts[i].location.x - 20) + `px`;
  pin.style.top = (posts[i].location.y - 40) + `px`;
  pin.querySelector(`img`).src = posts[i].author.avatar;
  pin.querySelector(`img`).alt = posts[i].offers.title;
  map.appendChild(pin);
}
