"use strict";

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const isEscEvent = (evt, callback) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      callback();
    }
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
    cardPhotos.innerHTML = ``;
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
    window.util.map.insertBefore(cardItem, window.util.pins);

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

    if (cardTemplate) {
      document.querySelector(`.popup__close`).addEventListener(`click`, function () {
        document.querySelector(`.map__card`).remove();
      });
    }

    const mapFilterContainer = document.querySelector(`.map__filters-container`);
    window.util.map.insertBefore(cardItem, mapFilterContainer);
  };

  const open = (pinData) => {
    close();
    createCard(pinData);
    document.addEventListener(`keydown`, onMapEscPress);
  };

  const onMapEscPress = (evt) => {
    isEscEvent(evt, close);
  };

  const close = () => {
    const card = window.util.map.querySelector(`.map__card`);
    if (card) {
      card.remove();
      document.removeEventListener(`keydown`, onMapEscPress);
    }
  };

  window.card = {
    open,
    close
  };
})();
