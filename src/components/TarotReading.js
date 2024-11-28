import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/TarotReading.css';
import tarotDeck from '../data/tarotDeck.json'; // JSON с данными о картах

const TarotReading = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // Изначально не выбрана никакая карта
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Проверка токена доступа
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const storedToken = localStorage.getItem('tarotAccessToken');

    if (token !== storedToken) {
      alert('У вас нет доступа к раскладу. Пожалуйста, начните новый расклад.');
      navigate('/tarot');
      return;
    }

    // Восстанавливаем карты и выбранную карту
    const storedSelectedCard = localStorage.getItem('selectedCard');
    const storedCards = localStorage.getItem('cards');

    if (storedCards && storedSelectedCard) {
      setCards(JSON.parse(storedCards));
      setSelectedCard(JSON.parse(storedSelectedCard));
    } else {
      // Генерация случайных карт
      const getRandomCards = () => {
        let selectedCards = [];
        while (selectedCards.length < 3) {
          const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
          if (!selectedCards.some(card => card.name === randomCard.name)) {
            selectedCards.push(randomCard);
          }
        }
        return selectedCards;
      };

      const randomCards = getRandomCards();
      setCards(randomCards);
      
      // Сохраняем карты в localStorage
      localStorage.setItem('cards', JSON.stringify(randomCards));
    }
  }, [location, navigate]);

  // Обработчик клика по карте
  const handleCardClick = (card) => {
    // Если карта уже выбрана, скрываем её описание
    if (selectedCard === card) {
      setSelectedCard(null);
      localStorage.removeItem('selectedCard');
    } else {
      setSelectedCard(card); // Выбираем карту
      localStorage.setItem('selectedCard', JSON.stringify(card)); // Сохраняем выбранную карту
    }
  };

  return (
    <div className="tarot-reading-container">
      <h1 className="tarot-heading">Ваш расклад Таро</h1>
      <p className="tarot-description">Выберите карту, чтобы раскрыть её тайное значение...</p>
      <div className="tarot-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`tarot-card ${selectedCard === card ? 'selected' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <img src={card.img} alt={card.name} className="tarot-card-img" />
          </div>
        ))}
      </div>

      {/* Показываем описание только для выбранной карты */}
      <div className={`tarot-card-details ${selectedCard ? 'visible' : ''}`}>
        {selectedCard && (
          <>
            <h2>{selectedCard.name}</h2>
            <h4>Общее значение:</h4>
            <p>{selectedCard.general}</p>
            <h4>Значение в любви и отношениях:</h4>
            <p>{selectedCard.love}</p>
            <h4>Предостережение карты:</h4>
            <p>{selectedCard.warning}</p>
          </>
        )}
      </div>

    </div>
  );
};

export default TarotReading;
