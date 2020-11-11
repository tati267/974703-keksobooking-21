'use strict';

// Данный модуль отвечает за работу фильтров
// В нём будет находится функция фильтрации
// Фильтрация начинает работать  возникает событие change на форме фильтрации

(function () {

  // Соответствие между названиями данных фильров в форме и в объекте недвижимости
  const FILTER_TYPE = {
    'housing-price': `price`,
    'housing-type': `type`,
    'housing-rooms': `rooms`,
    'housing-guests': `guests`
  };
  // Находим блок фильтров в DOM
  const formFilters = document.querySelector(`.map__filters`);

  // Функция фильтрации массива
  const filtrationRealEstates = () => {
    // Проверяем, есть ли карточка объявления, если есть и она не скрыта, то скрываем её
    if (window.card.cardTemplate) {
      if (!window.card.cardTemplate.classList.contains(`hidden`)) {
        window.card.cardTemplate.classList.add(`hidden`);
      }
    }
    // Очищаем карту от предыдущих меток
    window.pin.deletePins();

  };

  // На каждое изменение формы фильтрации вызываем функцию фильтрации
  formFilters.addEventListener(`change`, filtrationRealEstates);

  // Экспорт данных
  window.filter = {
    formFilters
  };

})();
