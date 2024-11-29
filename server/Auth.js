const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const saltRounds = 10;

// Настройка транспортера для отправки почты
const transporter = nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
        user: 'makswarpten@mail.ru', // Ваш email
        pass: 'Mm0udKXcfH1AvfZNnrXu' // Пароль от почты
    }
});

// Функция для отправки писем
const sendMail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: '"Вселенная" <makswarpten@mail.ru>',
            to,
            subject,
            text,
        });

        console.log('Email отправлен:', info.response);
    } catch (error) {
        console.error('Ошибка при отправке письма:', error);
    }
};

module.exports = (db) => {
    const router = express.Router();

    // Генерация случайного кода подтверждения
    const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

    // Регистрация
    router.post('/register', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: 'Email и пароль обязательны!' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const confirmationCode = generateCode();

            const query = `INSERT INTO users (email, password, confirmation_code) VALUES (?, ?, ?)`;

            db.run(query, [email, hashedPassword, confirmationCode], function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).send({ error: 'Пользователь с таким email уже существует.' });
                    }
                    return res.status(500).send({ error: 'Ошибка регистрации пользователя.' });
                }

                sendMail(email, 'Код подтверждения', `Ваш код подтверждения: ${confirmationCode}`)
                    .then(() => {
                        res.status(201).send({ message: 'Код подтверждения отправлен на почту!' });
                    })
                    .catch((mailError) => {
                        console.error('Ошибка при отправке письма:', mailError);
                        res.status(500).send({ error: 'Не удалось отправить код подтверждения.' });
                    });
            });
        } catch (error) {
            res.status(500).send({ error: 'Ошибка сервера.' });
        }
    });

    // Подтверждение кода
    router.post('/confirm', (req, res) => {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).send({ error: 'Email и код обязательны!' });
        }

        const query = `SELECT * FROM users WHERE email = ? AND confirmation_code = ?`;

        db.get(query, [email, code], (err, user) => {
            if (err) {
                return res.status(500).send({ error: 'Ошибка сервера.' });
            }

            if (!user) {
                return res.status(400).send({ error: 'Неверный код подтверждения.' });
            }

            const updateQuery = `UPDATE users SET is_confirmed = 1, confirmation_code = NULL WHERE email = ?`;
            db.run(updateQuery, [email], (err) => {
                if (err) {
                    return res.status(500).send({ error: 'Ошибка при подтверждении.' });
                }

                res.status(200).send({ message: 'Аккаунт успешно подтверждён!' });
            });
        });
    });

    const jwt = require('jsonwebtoken');

    // Секретный ключ для подписи токенов (можно использовать более сложный ключ)
    const SECRET_KEY = 'your-secret-key';

    router.post('/login', (req, res) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).send({ error: 'Email и пароль обязательны!' });
        }
    
        const query = `SELECT * FROM users WHERE email = ?`;
    
        db.get(query, [email], async (err, user) => {
            if (err) {
                return res.status(500).send({ error: 'Ошибка сервера.' });
            }
    
            if (!user) {
                return res.status(404).send({ error: 'Пользователь не найден.' });
            }
    
            if (!user.is_confirmed) {
                // Если аккаунт не подтвержден, отправляем новый код подтверждения
                const confirmationCode = generateCode();
                user.confirmation_code = confirmationCode;  // Обновляем код подтверждения
                db.run(`UPDATE users SET confirmation_code = ? WHERE email = ?`, [confirmationCode, email], (err) => {
                    if (err) {
                        return res.status(500).send({ error: 'Ошибка при отправке кода подтверждения.' });
                    }
    
                    // Отправляем новый код на почту
                    sendMail(email, 'Новый код подтверждения', `Ваш новый код подтверждения: ${confirmationCode}`)
                        .then(() => {
                            res.status(400).send({ error: 'Аккаунт не подтверждён. Новый код отправлен на почту.' });
                        })
                        .catch((mailError) => {
                            console.error('Ошибка при отправке письма:', mailError);
                            res.status(500).send({ error: 'Не удалось отправить код подтверждения.' });
                        });
                });
    
                return;
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send({ error: 'Неверный пароль.' });
            }
    
            // Генерация JWT токена
            const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    
            // Отправка токена
            res.status(200).send({ message: 'Авторизация успешна!', token });
        });
    });
    

    


    return router;
};
