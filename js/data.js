"use strict";

(function () {
  // Функция которая возвращает объекты
  const makePost = [];
  const getPin = () => {
    // Цикл который добавляет объекты
    for (let i = 0; i < window.util.POSTS_NUMBER; i++) {
      makePost.push({
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
          features: window.util.getRandomArray(window.util.FEATURES),
          description: `строка с описанием`,
          photos: window.util.getRandomArray(window.util.PHOTOS)
        },
        location: {
          x: window.util.getRandomInteger(window.util.MIN_LOCATION_X, window.util.MAX_LOCATION_X),
          y: window.util.getRandomInteger(window.util.MIN_LOCATION_Y, window.util.MAX_LOCATION_Y),
        }
      });
    }
    return makePost;
  };

  window.data = {
    getPin,
    makePost
  };
})();
