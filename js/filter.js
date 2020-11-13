'use strict';

(function () {
  const ANY_VALUE = `any`;
  const NUMBER_PINS = 5;

  const TIME_OUT = 500;

  const filter = document.querySelector(`.map__filters-container`);
  const housingType = filter.querySelector(`#housing-type`);

  const getFilterType = (elem) => {
    return housingType.value === ANY_VALUE || elem.offer.type === housingType.value;
  };

  const filterData = (array) => {
    let filterAdverts = [];

    for (let i = 0; i < array.length; i++) {
      if (
        filterAdverts.length < NUMBER_PINS &&
        getFilterType(array[i])
      ) {
        filterAdverts.push(array[i]);
      }
    }

    return filterAdverts;
  };

  const debounce = (cb, time) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, time);
    };
  };

  const onFilterChange = () => {
    const filteredAdverts = filterData(window.dataWithId);

    window.card.close();
    window.pin.deletePins();
    window.pin.createPin(filteredAdverts);
  };

  filter.addEventListener(`change`, debounce(onFilterChange, TIME_OUT));

  window.filter = {
    filterData
  };
})();

