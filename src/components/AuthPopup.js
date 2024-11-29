import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AuthPopup.css';

const AuthPopup = ({ onClose, onAuthChange }) => {
    const [isLogin, setIsLogin] = useState(true); // Режим входа или регистрации
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmationCode, setConfirmationCode] = useState(Array(6).fill('')); // Код подтверждения
    const [isConfirmed, setIsConfirmed] = useState(false); // Состояние подтверждения

    const handleCodeChange = (index, value) => {
        const newCode = [...confirmationCode];
        newCode[index] = value.replace(/\D/g, ''); // Только цифры
        setConfirmationCode(newCode);

        // Автофокус на следующее поле
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('/api/auth/register', { email, password });
            if (response.status === 201) {
                setMessage('Код подтверждения отправлен на почту. Проверьте ваш почтовый ящик.');
                setIsConfirmed(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Ошибка при регистрации.');
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setMessage('');
        const code = confirmationCode.join(''); // Преобразуем массив в строку
        try {
            const response = await axios.post('/api/auth/confirm', { email, code });
            if (response.status === 200) {
                setMessage('Аккаунт подтверждён! Теперь вы можете войти.');
                setIsConfirmed(false);
                setIsLogin(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Ошибка подтверждения кода.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.status === 200) {
                const { token } = response.data;
                if (token) {
                    localStorage.setItem('authToken', token);
                    setMessage('Вход выполнен успешно!');
                    onAuthChange(true);
                    onClose();
                }
            }
        } catch (error) {
            if (error.response?.data?.error?.includes('Аккаунт не подтверждён')) {
                setIsConfirmed(true); // Переход в режим подтверждения
                setMessage('Аккаунт не подтверждён. Введите код из письма.');
            } else {
                setMessage(error.response?.data?.error || 'Ошибка авторизации.');
            }
        }
    };

    return (
        <div className="auth-popup">
            <div className="auth-popup__content">
                <button onClick={onClose} className="auth-popup__close">×</button>
                <h2>{isLogin ? (isConfirmed ? 'Подтверждение' : 'Авторизация') : 'Регистрация'}</h2>
                <form onSubmit={isLogin && isConfirmed ? handleConfirm : isLogin ? handleLogin : handleRegister}>
                    <input
                        type="email"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isConfirmed} // Запретить ввод email на этапе подтверждения
                    />
                    {!isConfirmed && (
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    )}
                    {isConfirmed && (
                        <div className="code-input-container">
                            {confirmationCode.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    className="code-input"
                                />
                            ))}
                        </div>
                    )}
                    <button type="submit">
                        {isLogin && isConfirmed
                            ? 'Подтвердить код'
                            : isLogin
                            ? 'Войти'
                            : 'Зарегистрироваться'}
                    </button>
                </form>
                {message && <p className="auth-popup__message">{message}</p>}
                {!isConfirmed && (
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setIsConfirmed(false);
                            setMessage('');
                        }}
                        className="auth-popup__toggle"
                    >
                        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AuthPopup;
