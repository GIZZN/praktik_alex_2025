import React from 'react';

const SearchBlock = () => {
  return (
    <div className="search-container">
      <form className="search-form">
        <div className="search-group type">
          <select className="search-select">
            <option value="">Тип недвижимости</option>
            <option value="apartment">Квартира</option>
            <option value="house">Дом</option>
            <option value="commercial">Коммерческая</option>
            <option value="land">Участок</option>
          </select>
        </div>
        <div className="search-group location">
          <input
            type="text"
            className="search-input"
            placeholder="Район, адрес или ЖК"
          />
        </div>
        <button type="submit" className="search-button">
          Найти квартиру
        </button>
      </form>
    </div>
  );
};

export default SearchBlock; 