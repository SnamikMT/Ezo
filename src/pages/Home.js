import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthPopup from '../components/AuthPopup'; // Импортируем поп-ап
import '../styles/Home.css';
import right from '../img/large-image.png';
import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import image3 from '../img/image3.png';
import star from '../img/star.svg';
import star2 from '../img/star.svg';
import star3 from '../img/star.svg';
import logo from '../img/logoHome.svg';
import service1 from '../img/service1.svg';
import service2 from '../img/service2.svg';
import service3 from '../img/service3.svg';

const Home = () => {
  const [backgroundColor, setBackgroundColor] = useState('#2b2e4a');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Удаляем токен при выходе
    console.log('Вы вышли из системы.');
  };

  // Функция для изменения состояния аутентификации
  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
    if (authStatus) {
      // Сохраняем токен в localStorage при успешной авторизации
      localStorage.setItem('authToken', 'your_token_here'); // Замените на реальный токен
    } else {
      localStorage.removeItem('authToken'); // Удаляем токен при выходе
    }
  };

  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // Если токен найден, считаем, что пользователь авторизован
    }
  }, []);
  
  const sections = [
    {
      id: 'tarot',
      title: 'Таро расклад',
      text: 'Получите ответы на свои вопросы с помощью древней системы Таро.',
      detailedText: 'Таро — это уникальный инструмент самопознания и предсказания, который помогает разобраться в жизненных ситуациях, получить ответы на важные вопросы и найти скрытые возможности. Каждая карта Таро несёт глубокий символизм, позволяя заглянуть в будущее и проанализировать настоящее. Расклады помогают понять, что вас ожидает, какие трудности могут возникнуть и как их преодолеть. Это путешествие в мир архетипов, интуиции и магии.',
      link: '/tarot',
      image: service1,
      buttonText: 'Разложить карты',
    },
    {
      id: 'matrix',
      title: 'Матрица судьбы',
      text: 'Узнайте ключевые аспекты своей судьбы и кармические уроки.',
      detailedText: 'Матрица судьбы — это уникальная методика, которая раскрывает кармические задачи вашей души, помогает узнать, с какими энергиями вы пришли в этот мир, и что является вашим истинным предназначением. Этот подход основан на нумерологии и энергетике, связывая вас с вашим внутренним потенциалом. Матрица помогает понять, как прошлое влияет на настоящее и какие уроки необходимо пройти для достижения гармонии.',
      link: '/matrix',
      image: service2,
      buttonText: 'Узнать судьбу',
    },
    {
      id: 'natal-chart',
      title: 'Натальная карта',
      text: 'Разберите астрологическую карту рождения и откройте потенциал вашей души.',
      detailedText: 'Натальная карта — это ваш личный астрологический паспорт, составленный на основе точного времени, даты и места рождения. Она раскрывает ваш характер, способности, предназначение и кармические задачи. Анализ натальной карты помогает понять, как планеты влияют на вас, какие возможности предоставляет жизнь, а также предупреждает о возможных сложностях.',
      link: '/natal-chart',
      image: service3,
      buttonText: 'Изучить Натальную карту',
    },
  ];
  
  const imageRefs = useRef([]);

  const handleScroll = () => {
    const sections = document.querySelectorAll('.service');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        setBackgroundColor(getComputedStyle(section).getPropertyValue('--bg-color'));
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((image, index) => {
        const section = image?.closest('.service');
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY + window.innerHeight / 2;

        if (scrollY < sectionTop || scrollY > sectionTop + sectionHeight) return;

        const scrollRatio = (scrollY - sectionTop) / sectionHeight;
        const maxMovement = sectionHeight - image.offsetHeight;

        image.style.transform = `translateY(${scrollRatio * maxMovement}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home" style={{ backgroundColor }}>
     
      
      <section className="hero"> 
      <nav className="header__navHome">
        <div className="header__leftHome">
          <img src={logo} alt="Logo" className="header__imageHome" />
        </div>
        {/* <div className="header__linksHome">
          <Link to="/tarot" className="header__linkHome">Таро расклад</Link>
          <Link to="/matrix" className="header__linkHome">Матрица судьбы</Link> 
          <Link to="/natal-chart" className="header__linkHome">Натальная карта</Link>
        </div> */}
      </nav>


        <nav className="navbar-1">
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

        <div className="hero__content">
          <h1>ПРИЗМА<br /><span>ЖЕЛАНИЙ</span></h1>
          <p>Откройте тайны вашей судьбы с астрологией, Таро и матрицей жизни.</p>
          <div className="hero__buttons">
            <div className="button-container">
              <a href="#tarot" className="hero-link"> {/* Ссылка на секцию Таро */}
                <button className="hero-button">
                  <img src={image1} alt="Button 1" />
                </button>
                <span className="button-text">Забрать карту</span>
              </a>
            </div>
            <div className="button-container">
              <a href="#matrix" className="hero-link"> {/* Ссылка на секцию Матрица судьбы */}
                <button className="hero-button">
                  <img src={image2} alt="Button 2" />
                </button>
                <span className="button-text">Узнать судьбу</span>
              </a>
            </div>
            <div className="button-container">
              <a href="#natal-chart" className="hero-link"> {/* Ссылка на секцию Натальная карта */}
                <button className="hero-button">
                  <img src={image3} alt="Button 3" />
                </button>
                <span className="button-text">Забрать расклад</span>
              </a>
            </div>
          </div>


        </div>

        <div className={isVisible ? "visible" : ""}>
        <>
          {isAuthenticated ? (
            <button className="auth" onClick={handleLogout}>
              <div className="front">
                <span>Выйти</span>
              </div>
              <div className="back">
                <span>Уже уходите(?</span>
              </div>
            </button>
          ) : (
            <button className="auth" onClick={togglePopup}>
              <div className="front">
                <span>Войти</span>
              </div>
              <div className="back">
                <span>Жми сюда</span>
              </div>
            </button>
          )}
          {showPopup && !isAuthenticated && (
            <AuthPopup onClose={togglePopup} onAuthChange={handleAuthChange} />
          )}
        </>
      

      <img className="star" src={star} alt="star 1" />
      <img className="star2" src={star2} alt="star 2" />
      <img className="star3" src={star3} alt="star 3" />
    </div>


        <div className="hero__image">
          <img src={right} alt="Main Visual" />
        </div>

      </section>

      <>
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id} 
            className={`service ${section.id}`}
            style={{ '--bg-color': index % 2 === 0 ? '#353637' : '#F5F5F5' }}
          >
            <div className={`service__content service__content--${section.id}`}>
              <h2>{section.title}</h2>
              <p>{section.detailedText}</p>
              <Link to={section.link} className={`service__link service__link--${section.id}`}>
                {section.buttonText}
              </Link>
              <div className={`service__track service__track--${section.id}`}>
                <img
                  src={section.image}
                  alt={section.title}
                  ref={(el) => (imageRefs.current[index] = el)}
                  className={`service__image service__image--${section.id}`}
                />
              </div>
            </div>
          </section>
        ))}
      </>

    </div>
  );
};

export default Home;
