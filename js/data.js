"use strict";

(function () {
  // Функция которая возвращает объекты
  let makeAd = [];
  const makeAdData = () => {
    // Цикл который добавляет объекты
    for (let i = 0; i < window.util.POSTS_NUMBER; i++) {
      makeAd.push({
        author: {
          avatar: `img/avatars/user0${i + 1}.png`
        },
        offer: {
          title: `Заголовок предложения`,
          address: `x, y`,
          price: window.util.getRandomInteger(window.util.MIN_PRICE, window.util.MAX_PRICE),
          type: window.util.getRandomArrayElement(window.util.TYPES_EN),
          rooms: window.util.getRandomInteger(window.util.MIN_ROOMS, window.util.MAX_ROOMS),
          guests: window.util.getRandomInteger(window.util.MIN_GUESTS, window.util.MAX_GUESTS),
          checkin: window.util.getRandomArrayElement(window.util.CHECKTIMES),
          checkout: window.util.getRandomArrayElement(window.util.CHECKTIMES),
          features: window.util.FEATURES,
          description: `строка с описанием`,
          photos: window.util.PHOTOS
        },
        location: {
          x: window.util.getRandomInteger(window.util.MIN_LOCATION_X, window.util.MAX_LOCATION_X),
          y: window.util.getRandomInteger(window.util.MIN_LOCATION_Y, window.util.MAX_LOCATION_Y),
        }
      });
    }
    return makeAd;
  };

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
    const cardItem = window.elements.cardTemplate.cloneNode(true);
    const roomNum = obj.offer.rooms;
    const guestNum = obj.offer.guests;
    const guestPhrase = ` гостей `;
    const roomPhrase = ` комнаты `;
    window.elements.map.insertBefore(cardItem, window.elements.mapPins);

    cardItem.querySelector(`.popup__title`).textContent = obj.offer.title;
    cardItem.querySelector(`.popup__text--address`).textContent = obj.offer.address;
    cardItem.querySelector(`.popup__text--price`).innerHTML = `${obj.offer.price} &#x20bd/ночь`;
    cardItem.querySelector(`.popup__type`).textContent = window.util.offerTypes[obj.offer.type].name;
    cardItem.querySelector(`.popup__text--capacity`).textContent = `${roomNum}${roomPhrase} для ${guestNum}${guestPhrase}`;
    cardItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin}, выезд после ${obj.offer.checkout}`;
    renderFeatures(obj, cardItem);
    cardItem.querySelector(`.popup__description`).textContent = obj.offer.description;
    renderPhotos(obj, cardItem);
    cardItem.querySelector(`.popup__avatar`).src = obj.author.avatar;

    if (document.querySelector(`.popup__close`)) {
      document.querySelector(`.popup__close`).addEventListener(`click`, function () {
        document.querySelector(`.map__card`).remove();
      });
    }

    const mapFilterContainer = document.querySelector(`.map__filters-container`);
    window.elements.map.insertBefore(cardItem, mapFilterContainer);
    return cardItem;
  };

  window.data = {
    makeAd,
    makeAdData,
    createCard,
  };
})();
