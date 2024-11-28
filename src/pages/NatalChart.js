import React, { useState } from 'react';
import { Equator, Observer, AstroTime } from 'astronomy-engine';
import interpretations from './interpretations.json'; // Трактовки
import '../styles/NatalChart.css'; // Стили

const NatalChart = () => {
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [chartData, setChartData] = useState(null);

  // Определяем широту и долготу по умолчанию
  const defaultLatitude = 55.75; // Москва
  const defaultLongitude = 37.62; // Москва

  // Определяем знак зодиака
  const getZodiacSign = (ra) => {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    const index = Math.floor((ra / 30) % 12);
    return signs[index];
  };

  const calculateChart = () => {
    if (!gender || !date) {
      alert('Пожалуйста, выберите пол и укажите дату рождения!');
      return;
    }

    try {
      const observer = new Observer(defaultLatitude, defaultLongitude, 0);
      const astroTime = new AstroTime(new Date(`${date}T12:00`)); // Полдень по умолчанию

      // Рассчёт положений небесных тел
      const celestialBodies = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
      const positions = celestialBodies.map((body) => {
        const pos = Equator(body, astroTime, observer, true, true);
        const zodiacSign = getZodiacSign(pos.ra);
        return {
          body,
          zodiacSign,
          interpretation: interpretations[zodiacSign]
        };
      });

      setChartData({ gender, date, positions });
    } catch (error) {
      console.error('Ошибка при расчёте:', error);
    }
  };

  return (
    <div className="natal-chart">
      <h1 className="title">Натальная карта</h1>
      <div className="form-container">
        <label>
          Пол:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Выберите...</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </label>
        <label>
          Дата рождения:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button className="calculate-button" onClick={calculateChart}>
          Рассчитать
        </button>
      </div>

      {chartData && (
        <div className="results-container">
          <h2 className="subtitle">Результаты:</h2>
          <p><strong>Пол:</strong> {chartData.gender === 'male' ? 'Мужской' : 'Женский'}</p>
          <p><strong>Дата рождения:</strong> {chartData.date}</p>
          <table className="results-table">
            <thead>
              <tr>
                <th>Небесное тело</th>
                <th>Знак зодиака</th>
                <th>Трактовка</th>
              </tr>
            </thead>
            <tbody>
              {chartData.positions.map(({ body, zodiacSign, interpretation }) => (
                <tr key={body}>
                  <td>{body}</td>
                  <td>{zodiacSign}</td>
                  <td>{interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NatalChart;
