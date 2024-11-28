import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Tarot.css';
import offerWebp from '../img/offer.webp';
import offerPng from '../img/offer.png';
import magic2 from '../img/магик2.svg';
import magic from '../img/магик1.svg';
import taros from '../img/расклад.png';

const Tarot = () => {
  const [progress, setProgress] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [text, setText] = useState("Готовимся к раскладу...");
  const [showPopup, setShowPopup] = useState(false);
  const [offerTimer, setOfferTimer] = useState(600); // Таймер в секундах (10 минут)
  const [cards, setCards] = useState([]);
  const [interpretation, setInterpretation] = useState("");

  const navigate = useNavigate();

  const messages = [
    "Карты Таро начинают шептать...",
    "Энергия вокруг вас усиливается...",
    "Карты собирают вашу судьбу...",
    "Расклад готовится... терпение!",
    "Таро открывает двери вселенной..."
  ];

  useEffect(() => {
    let interval;
    if (isCalculating && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress % 20 === 0 && newProgress < 100) {
            setText(messages[(newProgress / 20) - 1]);
          }
          return Math.min(newProgress, 100);
        });
      }, 80);
    } else if (progress >= 100) {
      clearInterval(interval);
      setText("Расклад завершен! Переворачиваем карты...");
      setTimeout(() => setShowPopup(true), 1000);
    }
    return () => clearInterval(interval);
  }, [isCalculating, progress]);

  useEffect(() => {
    if (showPopup && offerTimer > 0) {
      const timer = setInterval(() => {
        setOfferTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showPopup, offerTimer]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setProgress(0);
    setText("Начинаем магию...");
  };

  const handleGetTarot = () => {
    const tarotDeck = [
      { name: "Солнце", interpretation: "Ожидайте успех, радость и ясность." },
      { name: "Луна", interpretation: "Будьте осторожны, могут быть иллюзии и обманы." },
      { name: "Колесо Фортуны", interpretation: "Скоро наступит перемена в вашей жизни." },
      { name: "Маг", interpretation: "У вас есть сила изменить свою судьбу." },
      { name: "Башня", interpretation: "Будьте готовы к разрушению старых структур в вашей жизни." },
      { name: "Звезда", interpretation: "Верьте в надежду, перемены к лучшему." },
      { name: "Дьявол", interpretation: "Остерегайтесь искушений и манипуляций." },
      { name: "Отшельник", interpretation: "Пора побыть в одиночестве, чтобы обрести внутреннюю гармонию." }
    ];

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
    setInterpretation(randomCards.map(card => card.interpretation).join(' '));

    const token = Date.now().toString();
    localStorage.setItem('tarotAccessToken', token);
    navigate(`/tarot-reading?token=${token}`);
  };

  return (
    <div id="app">
      <main>
        <div className="lend">
          <div className="element">
            <img src={magic2} alt="Изображение" width="100" />
          </div>
          <div className="element2">
            <img src={magic} alt="Изображение" width="100" />
          </div>
          <div className="lend__content">
            <section className="offer">
              <div className="offer__image">
                <h1>Расклад Таро</h1>
                <picture>
                  <source srcSet={offerWebp} type="image/webp" />
                  <img src={offerPng} alt="Изображение" height="213" width="360" />
                </picture>
              </div>
              <div className="offer__block">
                <p className="text">
                  Карты Таро раскрывают скрытые аспекты вашей жизни, помогают
                  лучше понять себя и принять осознанные решения в сложных
                  ситуациях.
                </p>
              </div>
            </section>
            <section className="forms">
              <div className="forms__content">
                <div className="h3">Получите расклад Таро</div>
                <div className="forms__flex">
                  <p className="text">Пол:</p>
                  <input type="radio" name="sex" id="woman" defaultChecked />
                  <label htmlFor="woman"><p className="text">Женский</p></label>
                  <input type="radio" name="sex" id="man" />
                  <label htmlFor="man"><p className="text">Мужской</p></label>
                </div>
                <div className="h3">Укажите дату рождения</div>
                <div className="forms__flex">
                  <select name="day" id="day">
                    {[...Array(31)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select name="month" id="month">
                    {['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'].map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="year" id="year">
                    {[...Array(100)].map((_, index) => {
                      const year = new Date().getFullYear() - index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="h3">Укажите имя</div>
                <label className="label-name" htmlFor="name">
                  <input
                    className="name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Имя"
                  />
                </label>
              </div>
              <button
                className="link open"
                onClick={handleCalculate}
                disabled={isCalculating}
              >
                Рассчитать
              </button>
            </section>
            {isCalculating && (
              <div className="progress-container">
                {progress < 100 ? (
                  <>
                    <div className="progress-circle"></div>
                    <span className="progress-percentage">{progress}%</span>
                    <p className="mystic-text">{text}</p>
                  </>
                ) : (
                  <div className="checkmark">✔</div>
                )}
              </div>
            )}
            {showPopup && (
              <div className="offer-popup">
                <h2>Расклад Таро готов!</h2>
                <img src={taros} alt="Предложение" />
                <p className='personal'>Персональный таро расклад готов!</p>
                <p className='offs'>Предложение действует: <b>{Math.floor(offerTimer / 60)} минут {offerTimer % 60} секунд</b></p>
                <p>В подарок<br></br>
                Персональная натальная карта по дате рождения</p>
                <button onClick={handleGetTarot}>Получить расклад</button>
                <div className="cards-container">
                  {cards.map((card, index) => (
                    <div key={index} className="card">
                      <h4>{card.name}</h4>
                      <p>{card.interpretation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tarot;
