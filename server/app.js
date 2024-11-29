const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const authRoutes = require('./Auth'); // Подключаем файл с маршрутами авторизации

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Database setup
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Подключение к SQLite успешно!');

        // Создаём таблицу пользователей, если её нет
        db.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                subscription_days INTEGER DEFAULT 0,
                confirmation_code TEXT DEFAULT NULL,
                is_confirmed INTEGER DEFAULT 0
            )`,
            (err) => {
                if (err) {
                    console.error('Ошибка при создании таблицы пользователей:', err.message);
                } else {
                    console.log('Таблица пользователей готова.');
                }
            }
        );
    }
});

// Подключение маршрутов авторизации
app.use('/api/auth', authRoutes(db));

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
