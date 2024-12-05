import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/adaptation.css';
import '../styles/App.css';
import '../styles/Matrix.css';
import '../styles/Form.css';
import web from '../img/backs.png';
import arrow from '../img/arrow-right.png';
import logo from '../img/logoMatrica.svg';
import matrixImage from '../img/matrixOff.png';

// Импортируем необходимые функции
import { calculateChakras } from '../components/matrix-calculator';
import { generateMatrixSVG } from '../components/matrix-generator';

const Matrix = () => {
  const [dob, setdob] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const yearRef = useRef(null);  
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrixTimer, setMatrixTimer] = useState(3600);
  const [isMatrixVisible, setIsMatrixVisible] = useState(false);

  const handleGetMatrix = () => {
    // Логика получения матрицы судьбы
    setShowMatrix(true);
    startMatrixTimer(); // Запуск таймера
  };
  
  const startMatrixTimer = () => {
    const interval = setInterval(() => {
      setMatrixTimer(prevTime => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    setdob(e.target.value);
  };

  const handleCalculateClick = () => {
    const dateValue = yearRef.current?.value;
  
    if (!dateValue) {
        alert('Пожалуйста, выберите дату рождения.');
        return;
    }
    
    setShowMatrix(false);
    setIsMatrixVisible(true);
  
    // Эмуляция загрузки (например, 2 секунды)
    setTimeout(() => {
      calculateMatrix();
    }, 1000); 
  };
  
  const MatrixLoading = () => {
    return (
      <div className="matrix-loading">
        <div className="loading-text">Загрузка...</div>
        <div className="matrix-effect">МАТРИЦА ИНФОРМАЦИИ...</div>
      </div>
    );
  };
  

  const calculateMatrix = () => {
    const dateValue = yearRef.current?.value;

    if (!dateValue) {
        alert('Пожалуйста, выберите дату рождения.');
        return;
    }

    // Разделяем дату на компоненты
    const [year, month, day] = dateValue.split('-').map(Number);

    if (!year || !month || !day) {
        alert('Ошибка: Неверный формат даты.');
        return;
    }

    // Лог для отладки: передаемые значения
    console.log("Передано в calculateChakras:", { day, month, year });

    const chakras = calculateChakras(day, month, year);

    // Лог для отладки: проверка результата calculateChakras
    console.log("Результат calculateChakras:", chakras);

    if (!Array.isArray(chakras)) {
        alert('Ошибка: Результат calculateChakras не является массивом.');
        return;
    }

    if (chakras.length === 1) {
        alert('Не удалось рассчитать чакры. Пожалуйста, попробуйте еще раз.');
        return;
    }

    generateMatrixSVG(chakras);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateMatrix();
  };

  // Установка текущей даты
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setdob(today);
  }, []);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.value = dob; 
    }
  }, [dob]);


  return (
    <div className="matrix-page" id="matrix-page">
      <header>
      <nav className="header__nav">
        <div className="header__left">
          <Link to="/"> {/* Добавляем Link с атрибутом to="/" для перехода на главную страницу */}
            <img src={logo} alt="Logo" className="header__image" />
          </Link>
        </div>
        <div className="header__links">
          <Link to="/tarot" className="header__link">Таро расклад</Link>
          <Link to="/matrix" className="header__link">Матрица судьбы</Link>
          <Link to="/natal-chart" className="header__link">Натальная карта</Link>
        </div>
        <div className="header__right">
        </div>
      </nav>


        <nav className="navbar-1">
        <div className="header__mobile">
          <img src={logo} alt="Logo" className="header__imageHome" />
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
              <a href="#Matrix" onClick={toggleMenu}>Матрица</a>
              <div className="divider"></div>
              <Link to="/natal-chart" className="header__link">Натальная карта</Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="container main_1">
      {/* Основная часть страницы */}
      <section className="main-left_1">
        <div className="image-text">
          <h2>Матрица Судьбы</h2>
          <p>Узнайте свою судьбу и получите полезные советы для улучшения жизни.</p>
        </div>

        <form className="form form-matrixBox" onSubmit={handleSubmit}>
          <div className="form_input">
            <div className="form_input-date">
              <label htmlFor="dob" className="date-label">Введите дату рождения</label>
              <input
                ref={yearRef}
                type="date"
                id="year"
                value={dob}
                onChange={handleInputChange}
                required
                min="1900-01-01"
                placeholder="(дата рождения)"
              />
            </div>
          </div>

          <div className="form_input-button">
            <button
              className="btn"
              type="button"
              onClick={handleGetMatrix}
            >
              Рассчитать
            </button>
          </div>

          <div className="ageDisplay" id="age-display">
            <p id="ageText"></p>
          </div>
        </form>
      </section>
    </div>

    <div className="container matrix" id="Matrix">
      {showMatrix && (
        <div className="matrix-popup">
          <h2>Матрица Судьбы готова!</h2>
          <img src={matrixImage} alt="Матрица Судьбы" />
          
          <p className='ofMatrix'>Матрица исчезнет через: <b>{Math.floor(matrixTimer / 360)} минут {matrixTimer % 60} секунд</b></p>
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
          <button onClick={handleCalculateClick}>Получить матрицу судьбы</button>
          <p className='personaldes'>Нажимая кнопку "Получить матрицу судьбы" вы подтверждаете ознакомление с офертой и тарифами, а также даете согласие на обработку персональных данных.</p>
        </div>
      )}


      <div className="blurred-background"></div>
      <div className="matrix-content">
        {/* Содержимое страницы */}
      </div>
    </div>

    {isMatrixVisible && (
        <div className="container matrix" id="Matrix">
          <div className="blurred-background"></div>
          <div className="matrix-content">
            <div className='matrix_up'>
              
              <div className='matrix-left_up'>
                <div id='svg-container'></div>
                <div id='matrixResult'></div>
              </div>
              
              <div className='matrix-right_up'>
                <div className='karta'>
                  <div className='karta-text'>
                    <div className='title'>Персональный расчет</div>
                    <div className='subtitle'>Карта здоровья</div>
                  </div>
                </div>
                <div className='matrix-table'>
                  <table className="tabl">
                    <tbody>
                      <tr className="header-row">
                          <td className="header-row_one">Чакра</td>
                          <td>Физика</td>
                          <td>Энергия</td>
                          <td>Эмоции</td>
                      </tr>
                      {/* Таблица чакр */}
                      <tr className="chakra-row" id="chakra7">
                          <td className="chakra-name">7.Сахасрара</td>
                          <td id="n33">a</td>
                          <td id="n34">b</td>
                          <td id="n35">i</td>
                      </tr>
                      <tr className="chakra-row" id="chakra6">
                          <td className="chakra-name">6.Аджна</td>
                          <td id="n36">a2</td>
                          <td id="n37">b2</td>
                          <td id="n38">l</td>
                      </tr>
                      <tr className="chakra-row" id="chakra5">
                          <td className="chakra-name">5.Вишудха</td>
                          <td id="n39">a3</td>
                          <td id="n40">b3</td>
                          <td id="n41">r</td>
                      </tr>
                      <tr className="chakra-row" id="chakra4">
                          <td className="chakra-name">4.Анахата</td>
                          <td id="n42">a4</td>
                          <td id="n43">b4</td>
                          <td id="n44">v</td>
                      </tr>
                      <tr className="chakra-row" id="chakra3">
                          <td className="chakra-name">3.Манипура</td>
                          <td id="n45">e</td>
                          <td id="n46">e</td>
                          <td id="n47">i</td>
                      </tr>
                      <tr className="chakra-row" id="chakra2">
                          <td className="chakra-name">2.Свадхистана</td>
                          <td id="n48">c1</td>
                          <td id="n49">d1</td>
                          <td id="n50">t</td>
                      </tr>
                      <tr className="chakra-row" id="chakra1">
                          <td className="chakra-name">1.Муладхара</td>
                          <td id="n51">c3</td>
                          <td id="n52">c3</td>
                          <td id="n53">k</td>
                      </tr>
                      <tr className="total-row">
                          <td className="chakra-number">ИТОГО</td>
                          <td id="n54">d3</td>
                          <td id="n55">c3</td>
                          <td id="n56">e3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="matrix_down">
              <div className="table-container">
                <table cellSpacing="10">
                  <tbody>
                    <tr>
                      <td width="50%" align="left" valign="top">
                        <div className="title">Поиск себя:</div>
                        <div className="subtitle">
                          Соединение мужского и женского. Выстраивание взаимоотношений. Способности, навыки, умения.
                        </div>
                      </td>
                      <td align="left" valign="top">
                        <div className="title">Социализация:</div>
                        <div className="subtitle">
                          Социальная и родовая системы. Результаты и признание в социуме.
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top">
                        <table className="inner-table">
                          <tbody>
                            <tr>
                              <td align="right" className="label">Небо:</td>
                              <td width="1" align="right">
                                <div className="round trans" id="n57"></div>
                              </td>
                              <td width="1" rowSpan="2" align="center" valign="middle">
                                <div className="icon-container">
                                  <span className="arrow">
                                    <img src={arrow} alt="arrow-right" />
                                  </span>
                                </div>
                              </td>
                              <td rowSpan="2">
                                <div className="round trans" id="n58"></div>
                              </td>
                            </tr>
                            <tr align="right">
                              <td align="right" className="label">Земля:</td>
                              <td>
                                <div className="round trans" id="n59"></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td align="left" valign="top">
                        <table className="inner-table">
                          <tbody>
                            <tr>
                              <td align="right" className="label">М:</td>
                              <td width="1" align="right">
                                <div className="round trans" id="n60"></div>
                              </td>
                              <td width="1" rowSpan="2" align="center" valign="middle">
                                <div className="icon-container">
                                  <span className="arrow">
                                    <img src={arrow} alt="arrow-right" />
                                  </span>
                                </div>
                              </td>
                              <td rowSpan="2">
                                <div className="round trans" id="n61"></div>
                              </td>
                            </tr>
                            <tr align="right">
                              <td align="right" className="label">Ж:</td>
                              <td><div className="round trans" id="n62"></div></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="top">
                        <div className="flex-container">
                          <div className="title">Духовная гармония:</div>
                          <div className="round trans" id="n63"></div>
                        </div>
                        <div className="subtitle">Духовный зачет. Кто я для бога? Где божественное во мне?</div>
                      </td>
                      <td align="left" valign="top">
                        <div className="flex-container">
                          <div className="title">Планетарное:</div>
                          <div className="round trans" id="n64"></div>
                        </div>
                        <div className="subtitle">Планетарное предназначение человека</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default Matrix;