import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Tarot.css';
import offerWebp from '../img/offer.webp';
import offerPng from '../img/offer2.png';
import magic2 from '../img/магик2.svg';
import magic from '../img/магик1.svg';
import taros from '../img/расклад.png';
import logo from '../img/logoHome2.svg';

const Tarot = () => {
  const [progress, setProgress] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [text, setText] = useState("Готовимся к раскладу...");
  const [showPopup, setShowPopup] = useState(false);
  const [offerTimer, setOfferTimer] = useState(600); // Таймер в секундах (10 минут)
  const [cards, setCards] = useState([]);
  const [interpretation, setInterpretation] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    sex: "woman",
    day: "",
    month: "",
    year: "",
    name: "",
  });

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const messages = [
    "Карты Таро начинают шептать...",
    "Энергия вокруг вас усиливается...",
    "Карты собирают вашу судьбу...",
    "Расклад готовится... терпение!",
    "Таро открывает двери вселенной..."
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const { sex, day, month, year, name } = formData;
    return sex && day && month && year && name.trim() !== "";
  };

  useEffect(() => {
    let interval;
    if (isCalculating && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 100));
      }, 80);
    } else if (progress >= 100) {
      clearInterval(interval);
      setText("Расклад завершен! Переворачиваем карты...");
      setTimeout(() => {
        if (isFormValid()) {
          setShowPopup(true);
        } else {
          alert("Пожалуйста, заполните все поля формы.");
        }
      }, 1000);
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
    // Получение значений из полей
    const selectedDay = document.getElementById("day").value;
    const selectedMonth = document.getElementById("month").value;
    const selectedYear = document.getElementById("year").value;
    const nameInput = document.getElementById("name").value.trim();
  
    // Проверка заполненности всех полей
    if (!selectedDay || !selectedMonth || !selectedYear || !nameInput) {
      alert("Пожалуйста, заполните все поля перед расчетом.");
      return;
    }
  
    // Если все поля заполнены, начинаем расчет
    setIsCalculating(true);
    setProgress(0);
    setText("Начинаем магию...");
  
    const messages = [
      "Карты Таро начинают шептать...",
      "Энергия вокруг вас усиливается...",
      "Карты собирают вашу судьбу...",
      "Расклад готовится... терпение!",
      "Таро открывает двери вселенной..."
    ];
  
    let messageIndex = 0;
    
    // Функция для обновления текста с интервалом
    const intervalId = setInterval(() => {
      if (messageIndex < messages.length) {
        setText(messages[messageIndex]);
        messageIndex += 1;
      } else {
        clearInterval(intervalId); // Останавливаем интервал после завершения
      }
    }, 1000); // Интервал смены сообщений (2 секунды)
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
      <nav className="header__navHome">
        <div className="header__leftHome">
        <Link to="/"> 
            <img src={logo} alt="Logo" className="header__image" />
          </Link>
        </div>
        <div className="header__linksHome">
          <Link to="/tarot" className="header__linkHome">Таро расклад</Link>
          <Link to="/matrix" className="header__linkHome">Матрица судьбы</Link> 
          <Link to="/natal-chart" className="header__linkHome">Натальная карта</Link>
        </div>
        <div className="header__right">
        </div>
      </nav>


        <nav className="navbar-1">
        <div className="header__mobile">
        <Link to="/"> 
            <img src={logo} alt="Logo" className="header__image" />
          </Link>
        </div>
          <div className="menu-button-wrapper">
            <input 
              type="checkbox" 
              className="menu-button" 
              id="menu-button" 
              checked={isMenuOpen} 
              onChange={toggleMenu} 
            />
            <div className="icon-wrapper">
              <label className="hamburger" htmlFor="menu-button" onClick={toggleMenu}>
                <span className="hamburger-line first"></span>
                <span className="hamburger-line second"></span>
                <span className="hamburger-line third"></span>
              </label>
            </div>
            <div className={`item-list ${isMenuOpen ? 'open' : ''}`}>
              <Link to="/">Главная страница</Link>
              <div className="divider"></div>
              <Link to="/tarot" className="header__link">Таро расклад</Link>
              <div className="divider"></div>
              <a href="/matrix" onClick={toggleMenu}>Матрица</a>
              <div className="divider"></div>
              <Link to="/natal-chart" className="header__link">Натальная карта</Link>
            </div>
          </div>
        </nav>

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
            <input
              type="radio"
              name="sex"
              id="woman"
              value="woman"
              checked={formData.sex === "woman"}
              onChange={handleInputChange}
            />
            <label htmlFor="woman">
              <p className="text">Женский</p>
            </label>
            <input
              type="radio"
              name="sex"
              id="man"
              value="man"
              checked={formData.sex === "man"}
              onChange={handleInputChange}
            />
            <label htmlFor="man">
              <p className="text">Мужской</p>
            </label>
          </div>
          <div className="h3">Укажите дату рождения</div>
          <div className="forms__flex">
            <select name="day" id="day" onChange={handleInputChange}>
              <option value="">День</option>
              {[...Array(31)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <select name="month" id="month" onChange={handleInputChange}>
              <option value="">Месяц</option>
              {[
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select name="year" id="year" onChange={handleInputChange}>
              <option value="">Год</option>
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
              value={formData.name}
              onChange={handleInputChange}
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
                
                <p className='offs'>Карты исчезнут через: <b>{Math.floor(offerTimer / 60)} минут {offerTimer % 60} секунд</b></p>
                <p className='personal'>Первые 7 дней, далее 399₽ или 99₽ раз в 30 дней или в зависимости от условий. Отмена в любой момент.</p>
                <div className="input-wrap">
                  <input
                    placeholder="Введите ваш e-mail"
                    name="order[email]"
                    id="email"
                    type="email"
                    className="form__email form__main-user-email"
                  />
                </div>
                <button onClick={handleGetTarot}>Получить расклад</button>
                <p className='personaldes'>Нажимая кнопку "Получить расклад" вы подтверждаете ознакомление с офертой и тарифами, а также даете согласие на обработку персональных данных.</p>
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
