'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);

  filters.addEventListener(`change`, (evt) => {
    let newData = [];

    if (evt.target.id === `housing-type`) {
      newData = evt.target.value === `any` ? window.backend.data : window.backend.data.filter((item) => item.offer.type === evt.target.value);
      window.card.close();
      window.pin.deletePins();
      window.pin.createPin(newData);
    }
  });

})();
