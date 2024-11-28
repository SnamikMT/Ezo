import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Подключение CSS стилей

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <h1 className="header__logo">Astro Tarot</h1>
        <div className="header__links">
          <Link to="/" className="header__link">Главная</Link>
          <Link to="/natal-chart" className="header__link">Натальная карта</Link>
          <Link to="/tarot" className="header__link">Таро расклад</Link>
          <Link to="/matrix" className="header__link">Матрица судьбы</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
